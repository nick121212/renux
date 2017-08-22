import * as redux from "redux";
export interface IEditState {
    showDialog: boolean;
    formData: any;
}
export declare class EditReducer {
    toggleDialogAction(prefix: string, dispatch: redux.Dispatch<boolean>, showDialog: boolean): void;
    editAction(prefix: string, dispatch: redux.Dispatch<boolean>, formData: any): void;
    private inc(state, act);
    private dec(state, act);
}
