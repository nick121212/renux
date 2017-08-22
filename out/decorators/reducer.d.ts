import { IMeta, IReducerInstance } from "../models/imeta";
export declare const createMeta: (target: any) => IMeta;
export declare const reducer: ({key, path}: IReducerInstance) => (target: any) => void;
