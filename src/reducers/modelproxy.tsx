import * as redux from "redux";
import { createAction, createActions, ActionFunctionAny } from "redux-actions";
import { injectable } from "inversify";
import * as Immutable from "immutable";
import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { delay } from "redux-saga";

import { reducer, handle, action, saga, container, Types, proxy } from "../index";

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

export const ActionTypes = {
    mpe: "MODELPROXY_EXECUTE",
    mpee: "MODELPROXY_EXECUTE_ERROR",
    mpep: "MODELPROXY_PRE_EXECUTE",
    mpes: "MODELPROXY_EXECUTE_SUCCESS",
};

@injectable()
@reducer({
    key: "modelproxy",
    path: "/Modelproxy"
})
export class ModelProxyReducer {

    /**
     * 执行接口action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    @action(ActionTypes.mpe)
    public executeAction(prefix: string, dispatch: redux.Dispatch<any>, options: any) {
        dispatch(createAction<any>(ActionTypes.mpe)({ options, prefix }));
    }

    /**
     * 执行接口action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    @action(ActionTypes.mpep)
    public executePreAction(prefix: string, dispatch: redux.Dispatch<any>) {
        return dispatch(createAction(prefix + "-" + ActionTypes.mpep)());
    }


    /**
     * 执行接口成功action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    @action(ActionTypes.mpes)
    public executeSuccessAction(prefix: string, dispatch: redux.Dispatch<any>, err: Error) {
        return dispatch(createAction<Error>(prefix + "-" + ActionTypes.mpes)(err));
    }
    /**
     * 执行接口失败action
     * @param prefix    前缀
     * @param dispatch  方法
     */
    @action(ActionTypes.mpee)
    public executeErrorAction(prefix: string, dispatch: redux.Dispatch<any>, data: any) {
        return dispatch(createAction<any>(prefix + "-" + ActionTypes.mpee)(data));
    }

    @handle(ActionTypes.mpep)
    private execute(state: Immutable.Map<string, any>): Immutable.Map<string, any> {
        return state.merge({
            data: null,
            error: false,
            loaded: false,
            loading: true,
        });
    }
    @handle(ActionTypes.mpes)
    private success(state: Immutable.Map<string, any>, act: ReduxActions.Action<any>): Immutable.Map<string, any> {
        return state.merge({
            data: act.payload,
            error: false,
            loaded: true,
            loading: false,
        });
    }
    @handle(ActionTypes.mpee)
    private error(state: Immutable.Map<string, any>, act: ReduxActions.Action<any>): Immutable.Map<string, any> {
        return state.merge({
            data: act.payload,
            error: true,
            loaded: false,
            loading: false,
        });
    }

    @saga({
        actionType: ActionTypes.mpe,
        takeFunc: takeEvery
    })
    private *listenExecuteAction(act: ReduxActions.Action<any>) {
        let { options, prefix } = act.payload;
        let { ns, key, data, params } = options;

        try {
            yield put(createAction(prefix + "-" + ActionTypes.mpep)());
            yield call(delay, 2000);
            let rtn = yield call(proxy.execute.bind(proxy, ns, key, {
                data: data,
                params: params
            }));

            yield this.executeSuccessAction(prefix, put, rtn);
        } catch (e) {
            yield this.executeErrorAction(prefix, put, e);
        }
    }
}

container.bind<ModelProxyReducer>(Types.REDUCER).to(ModelProxyReducer).inSingletonScope().whenTargetNamed("ModelProxyReducer");
