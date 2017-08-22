import { Types } from "../config/types";
import { IMeta, ISagaOptions } from "../models/imeta";
import { createMeta } from "./reducer";

export const saga = (options: ISagaOptions) => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IMeta = createMeta(target.constructor);

        metadata.sagas.push({ target, key, options, value });
    };
};
