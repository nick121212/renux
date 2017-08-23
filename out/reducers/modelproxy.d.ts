import * as redux from "redux";
export interface IModelProxyState {
    loading: boolean;
    loaded: boolean;
    error: boolean;
    data: any;
}
export interface IModelProxyProps {
    executeAction(): void;
    executeSuccessAction(): void;
    executeErrorAction(): void;
}
export declare const ActionTypes: {
    mpe: string;
    mpee: string;
    mpep: string;
    mpes: string;
};
export declare class ModelProxyReducer {
    executeAction(prefix: string, dispatch: redux.Dispatch<any>, options: any): void;
    executePreAction(prefix: string, dispatch: redux.Dispatch<any>): ReduxActions.Action<void>;
    executeSuccessAction(prefix: string, dispatch: redux.Dispatch<any>, err: Error): ReduxActions.Action<Error>;
    executeErrorAction(prefix: string, dispatch: redux.Dispatch<any>, data: any): ReduxActions.Action<any>;
    private execute(state);
    private success(state, act);
    private error(state, act);
    private listenExecuteAction(act);
}
