import { ISagaOptions } from "../models/imeta";
export declare const saga: (options: ISagaOptions) => (target: any, key: string, value: PropertyDescriptor) => void;
