/// <reference types="react" />
import * as React from "react";
import * as redux from "redux";
import * as Inversity from "inversify";
import { BaseFactory } from "modelproxy";
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
export declare class Renux<T> extends BaseFactory<RenuxReducer> implements IRenux<T> {
    private _container;
    private _rootPrefix;
    private _store;
    private _reducerMaps;
    /**
     * 构造
     * @param _container inversity的container类，从中获取所有的reducer
     */
    constructor(_container: Inversity.Container, _rootPrefix: string);
    /**
     * 创建store
     * @param reducer
     * @param initialState
     * @param middlewares
     */
    createStore(reducer: redux.Reducer<T>, initialState: T, middlewares?: Array<redux.Middleware>): redux.Store<T>;
    /**
     * 计算reducer
     * 递归计算reducer，合并成一个
     * @param map reducer地图
     */
    calcReducers(map?: any): redux.Reducer<T>;
    /**
     * 启动redux项目
     * @param element  根元素
     * @param conId    容器id
     * @param cb       回调
     */
    bootstracp(element: React.ReactElement<any>, conId?: string, cb?: any): void;
    private initSagas(sagaMiddle);
    /**
     * reducer初始化
     */
    private initReducers();
}
