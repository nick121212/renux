import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import * as Inversity from "inversify";
import { handleActions } from "redux-actions";
import * as jpp from "json-pointer";
import { ModelProxy, BaseFactory } from "modelproxy";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { Types } from "../config/types";
import { IMeta, IHandle, IReducerInstance, ISagaInstance } from "../models/imeta";
import { RenuxReducer } from "./reducer";

export interface IRenux<T> {
    createStore(reducer: redux.Reducer<T>, initialState: T, middlewares: Array<redux.Middleware>): redux.Store<T>;
}

/**
 * Renux类
 * 配置reducer
 * 配置action
 * 配置connect
 */
export class Renux<T> extends BaseFactory<RenuxReducer> implements IRenux<T> {
    private _store: redux.Store<T>;
    private _reducerMaps: any = {};

    /**
     * 构造
     * @param _container inversity的container类，从中获取所有的reducer
     */
    constructor(private _container: Inversity.Container, private _rootPrefix: string) {
        super();
        this.initReducers();
    }

    /**
     * 创建store
     * @param reducer
     * @param initialState
     * @param middlewares
     */
    public createStore(reducer: redux.Reducer<T>, initialState: T, middlewares: Array<redux.Middleware> = []): redux.Store<T> {
        const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

        this._store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, ...middlewares));
        this.initSagas(sagaMiddleware);

        return this._store;
    }

    /**
     * 计算reducer
     * 递归计算reducer，合并成一个
     * @param map reducer地图
     */
    public calcReducers(map: any = this._reducerMaps): redux.Reducer<any> {
        let rtns: redux.ReducersMapObject = {};

        for (let key in map) {
            if (map.hasOwnProperty(key)) {
                let element: any = map[key];

                if (element.constructor === Function) {
                    rtns[key] = element;
                } else {
                    rtns[key] = this.calcReducers(element);
                }
            }
        }

        return combineReducers(rtns as any);
    }

    /**
     * 启动redux项目
     * @param element  根元素
     * @param conId    容器id
     * @param cb       回调
     */
    public bootstracp(element: React.ReactElement<any>, conId: string = "root", cb: any = null) {
        ReactDOM.render(
            element,
            document.getElementById(conId) as any,
            cb
        );
    }

    private initSagas(sagaMiddle: SagaMiddleware<any>) {
        let reducers: Array<Function> = this._container.getAll<Function>(Types.REDUCER);

        reducers.forEach((reducer: Function) => {
            let meta: IMeta = Reflect.getMetadata(Types.REDUCER, reducer.constructor);

            if (meta) {
                meta.sagas.forEach((saga: ISagaInstance) => {
                    sagaMiddle.run(function* () {
                        yield saga.options.takeFunc(saga.options.actionType, saga.value.value.bind(saga.target));
                    });
                });
            }
        });
    }

    /**
     * reducer初始化
     */
    private initReducers(): void {
        let reducers: Array<Function> = this._container.getAll<Function>(Types.REDUCER);
        let rtn: { [key: string]: redux.Reducer<any> } = {};

        reducers.forEach((reducer: Function) => {
            let meta: IMeta = Reflect.getMetadata(Types.REDUCER, reducer.constructor);

            meta.rootPrefix = this._rootPrefix || "";

            if (meta) {
                this.add(meta.key, new RenuxReducer(meta, this._reducerMaps));
            }
        });
    }
}
