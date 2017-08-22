import { BaseFactory } from "modelproxy";
import * as jpp from "json-pointer";
import { handleActions } from "redux-actions";
import * as Immutable from "immutable";

import { IMeta, IHandle, IActionInstance } from "../models/imeta";
import { RenuxConnect } from "./connect";
import { RenuxSelector } from "./selector";

export class RenuxReducer extends BaseFactory<RenuxSelector> {
    constructor(private _meta: IMeta, private _reducerMaps: any) {
        super();
    }

    public init(key: string, keyPath: boolean, initialState: any = {}): void {
        let deal: any = {};
        let actions: any = {};
        let path = jpp.compile([...jpp.parse(this._meta.path), key]);

        // 处理reducer的switch方法
        this._meta.handles.forEach((handle: IHandle) => {
            let originHandle = handle.value.value;

            if (handle.key) {
                deal[key ? key + "-" + handle.type : handle.type] = handle.target[handle.key];
            }
        });
        // 处理reducer的actions
        this._meta.actions.forEach((action: IActionInstance) => {
            actions[action.key] = action.value.value.bind(action.target, key);
        });
        // 在reducermap上注册reducer
        jpp.set(this._reducerMaps, path, handleActions(deal, Immutable.Map(initialState)));
        // 加入注册的实例
        this.add(key, new RenuxSelector(actions, path, this._meta.key, keyPath ? key : "", this._meta.rootPrefix || ""));
    }
}
