import * as redux from "redux";
export interface ICounterState {
    count: number;
}
export interface ICounterReducer {
    incAction(): void;
    decAction(): void;
}
export declare class CounterReducer {
    incAction(prefix: string, dispatch: redux.Dispatch<void>): void;
    decAction(prefix: string, dispatch: redux.Dispatch<void>): void;
    private inc(state);
    private dec(state);
}
