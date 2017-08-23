import * as redux from "redux";
export declare class RenuxSelector {
    private _actions;
    private _path;
    private _prefix;
    private _key;
    private _rootPrefix;
    constructor(_actions: any, _path: string, _prefix: string, _key?: string, _rootPrefix?: string);
    mapStateToProps(): any;
    mapDispatchToProps(dispatch: redux.Dispatch<any>, ownProps: any): any;
    private getRawState(state);
}
