
import { createAction, createActions } from "redux-actions";
import { injectable } from "inversify";
import { reducer, handle } from "../../index";

export interface IListState<T> {
    currentPage: number;
    currentPageSize: number;
    data: T;
}

@injectable()
@reducer({
    key: "list",
    path: "/CRUD/LIST"
})
export class ListReducer {
    @handle("Pagination")
    public inc(state: IListState<any>, action: ReduxActions.Action<{ currentPage: number, currentPageSize: number }>): IListState<any> {
        return Object.assign({}, state, action.payload);
    }

    @handle("SHOWDATA")
    public dec(state: IListState<any>, action: ReduxActions.Action<any>): IListState<any> {
        return Object.assign({}, state, { data: action.payload });
    }
}
