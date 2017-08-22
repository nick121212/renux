import * as redux from "redux";
export declare class RenuxSelector {
    private _actions;
    private _path;
    private _prefix;
    private _key;
    private _rootPrefix;
    /**
     * 构造函数
     * @param _actions action数组
     * @param _path    reducer中state存储的路径
     * @param _prefix  前缀
     * @param _key     当前的key
     * @param _rootPrefix 根路径
     */
    constructor(_actions: any, _path: string, _prefix: string, _key?: string, _rootPrefix?: string);
    /**
     * 获取mapStatetoProps
     */
    mapStateToProps(): any;
    /**
     * dispatchToProps
     * @param dispatch 方法
     * @param ownProps 自身属性
     */
    mapDispatchToProps(dispatch: redux.Dispatch<any>, ownProps: any): any;
    /**
     * 获取数据
     * @param state state
     */
    private getRawState(state);
}
