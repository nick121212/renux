export interface IListState<T> {
    currentPage: number;
    currentPageSize: number;
    data: T;
}
export declare class ListReducer {
    inc(state: IListState<any>, action: ReduxActions.Action<{
        currentPage: number;
        currentPageSize: number;
    }>): IListState<any>;
    dec(state: IListState<any>, action: ReduxActions.Action<any>): IListState<any>;
}
