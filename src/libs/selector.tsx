import { createSelector } from "reselect";
import * as Immutable from "immutable";
import * as jpp from "json-pointer";
import * as redux from "redux";

export class RenuxSelector {
    /**
     * 构造函数
     * @param _actions action数组
     * @param _path    reducer中state存储的路径
     * @param _prefix  前缀
     * @param _key     当前的key
     * @param _rootPrefix 根路径
     */
    constructor(
        private _actions: any,
        private _path: string,
        private _prefix: string,
        private _key: string = "",
        private _rootPrefix: string = "") {

    }

    /**
     * 获取mapStatetoProps
     */
    public mapStateToProps(): any {
        return createSelector(this.getRawState.bind(this), (rawState: any) => {
            if (this._key) {
                return Immutable.Map({
                    [this._prefix]: {
                        [this._key]: rawState
                    }
                });
            }

            return Immutable.Map({ [this._prefix]: rawState });
        });
    }

    /**
     * dispatchToProps
     * @param dispatch 方法
     * @param ownProps 自身属性
     */
    public mapDispatchToProps(dispatch: redux.Dispatch<any>, ownProps: any): any {
        let actions: any = {};

        for (let key in this._actions) {
            if (this._actions.hasOwnProperty(key)) {
                let element = this._actions[key];

                actions[key] = element.bind(element, dispatch);
            }
        }

        if (this._key) {
            return {
                [this._prefix]: {
                    [this._key]: actions
                }
            };
        }

        return { [this._prefix]: actions };
    }

    /**
     * 获取数据
     * @param state state
     */
    private getRawState(state: Immutable.Map<string, any>): any {
        return state.getIn(jpp.parse(jpp.compile([...jpp.parse(this._rootPrefix), ...jpp.parse(this._path)])));
    }
}
