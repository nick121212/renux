import { ParametricSelector } from "reselect";
import { RenuxSelector } from "./selector";
export declare const RenuxConnect: (selectors: (RenuxSelector | ParametricSelector<any, any, any>)[]) => Function;
