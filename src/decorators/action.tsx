import { Types } from "../config/types";
import { IMeta } from "../models/imeta";
import { createMeta } from "./reducer";

export const action = (type: string) => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IMeta = createMeta(target.constructor);

        metadata.actions.push({ target, key, type, value });
    };
};
