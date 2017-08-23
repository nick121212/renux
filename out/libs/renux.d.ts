/// <reference types="react" />
import * as React from "react";
import * as redux from "redux";
import * as Inversity from "inversify";
import { BaseFactory } from "modelproxy";
import { RenuxReducer } from "./reducer";
export interface IRenux<T> {
    createStore(reducer: redux.Reducer<T>, initialState: T, middlewares: Array<redux.Middleware>): redux.Store<T>;
}
export declare class Renux<T> extends BaseFactory<RenuxReducer> implements IRenux<T> {
    private _container;
    private _rootPrefix;
    private _store;
    private _reducerMaps;
    constructor(_container: Inversity.Container, _rootPrefix: string);
    createStore(reducer: redux.Reducer<T>, initialState: T, middlewares?: Array<redux.Middleware>): redux.Store<T>;
    calcReducers(map?: any): redux.Reducer<any>;
    bootstracp(element: React.ReactElement<any>, conId?: string, cb?: any): void;
    private initSagas(sagaMiddle);
    private initReducers();
}
