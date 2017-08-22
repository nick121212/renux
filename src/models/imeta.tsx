import * as Redux from "redux";
import { ActionFunctionAny } from "redux-actions";

export interface IHandle {
    action?: ActionFunctionAny<any>;
    target: any;
    key: string;
    type: string;
    value: PropertyDescriptor;
}

export interface IReducerInstance {
    key: string;
    path: string;
}

export interface IActionInstance {
    key: string;
    target: any;
    type: string;
    value: PropertyDescriptor;
}

export interface ISagaOptions {
    actionType: string;
    takeFunc: Function;
}

export interface ISagaInstance {
    key: string;
    target: any;
    value: PropertyDescriptor;

    options: ISagaOptions;
}

export interface IMeta {
    key: string;
    path: string;
    rootPrefix?: string;
    actions: Array<IActionInstance>;
    instances: Array<IReducerInstance>;
    handles: Array<IHandle>;
    sagas: Array<ISagaInstance>;
}
