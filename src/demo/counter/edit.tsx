import * as redux from "redux";
import { createAction, createActions } from "redux-actions";
import { injectable } from "inversify";
import { reducer, handle, action } from "../../index";

export interface IEditState {
    showDialog: boolean;
    formData: any;
}

@injectable()
@reducer({
    key: "edit",
    path: "/CRUD/EDIT"
})
export class EditReducer {

    @action("SHOW")
    public toggleDialogAction(prefix: string, dispatch: redux.Dispatch<boolean>, showDialog: boolean) {
        dispatch(createAction<any>(prefix + "-SHOW")(showDialog));
    }

    @action("EDIT")
    public editAction(prefix: string, dispatch: redux.Dispatch<boolean>, formData: any) {
        dispatch(createAction<any>(prefix + "-EDIT")(formData));
    }

    @handle("SHOW")
    private inc(state: IEditState, act: ReduxActions.Action<boolean>): IEditState {
        // console.log(action.payload);
        return Object.assign({}, state, { showDialog: act.payload });
    }

    @handle("EDIT")
    private dec(state: IEditState, act: ReduxActions.Action<any>): IEditState {
        let formData = state.formData;

        formData = Object.assign({}, formData, act.payload);

        return Object.assign({}, state, { formData });
    }
}
