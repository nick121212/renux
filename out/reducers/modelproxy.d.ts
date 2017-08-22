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
    /**
     * 执行接口action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    executeAction(prefix: string, dispatch: redux.Dispatch<any>, options: any): void;
    /**
     * 执行接口action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    executePreAction(prefix: string, dispatch: redux.Dispatch<any>): ReduxActions.Action<void>;
    /**
     * 执行接口成功action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    executeSuccessAction(prefix: string, dispatch: redux.Dispatch<any>, err: Error): ReduxActions.Action<Error>;
    /**
     * 执行接口失败action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    executeErrorAction(prefix: string, dispatch: redux.Dispatch<any>, data: any): ReduxActions.Action<any>;
    private execute(state);
    private success(state, act);
    private error(state, act);
    private listenExecuteAction(act);
}
