import { Types } from "../config/types";
import { IMeta } from "../models/imeta";
import { createMeta } from "./reducer";

export const handle = (type: string) => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IMeta = createMeta(target.constructor);

        metadata.handles.push({ target, key, type, value });
    };
};
