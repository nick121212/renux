import { BaseFactory } from "modelproxy";
import { IMeta } from "../models/imeta";
import { RenuxSelector } from "./selector";
export declare class RenuxReducer extends BaseFactory<RenuxSelector> {
    private _meta;
    private _reducerMaps;
    constructor(_meta: IMeta, _reducerMaps: any);
    init(key: string, keyPath: boolean, initialState?: any): void;
}
