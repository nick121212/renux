import * as redux from "redux";
import { createAction, createActions, ActionFunctionAny } from "redux-actions";
import { injectable } from "inversify";
import * as Immutable from "immutable";

import { reducer, handle, action } from "../../index";

export interface ICounterState {
    count: number;
}

export interface ICounterReducer {
    incAction(): void;
    decAction(): void;
}

@injectable()
@reducer({
    key: "counter",
    path: "/Counter"
})
export class CounterReducer {

    @action("INC")
    public incAction(prefix: string, dispatch: redux.Dispatch<void>) {
        dispatch(createAction(prefix + "-INC")());
    }

    @action("DEC")
    public decAction(prefix: string, dispatch: redux.Dispatch<void>) {
        dispatch(createAction(prefix + "-DEC")());
    }

    @handle("INC")
    private inc(state: Immutable.Map<string, number>): Immutable.Map<string, number> {
        let count = state.get("count");

        return state.setIn(["count"], count + 1);
    }

    @handle("DEC")
    private dec(state: Immutable.Map<string, number>): Immutable.Map<string, number> {
        let count = state.get("count");

        return state.setIn(["count"], count - 1);
    }
}
