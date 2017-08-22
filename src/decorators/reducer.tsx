import { Types } from "../config/types";
import { IMeta, IReducerInstance } from "../models/imeta";

export const createMeta = (target: any): IMeta => {
    let metadata: IMeta = Reflect.getOwnMetadata(Types.REDUCER, target);

    if (!metadata) {
        metadata = {
            actions: [],
            handles: [],
            instances: [],
            key: "",
            path: "",
            sagas: []
        };
        Reflect.defineMetadata(Types.REDUCER, metadata, target);
    }

    return metadata;
};

export const reducer = ({ key, path }: IReducerInstance) => {
    return (target: any) => {
        let metadata: IMeta = createMeta(target);

        metadata.key = key;
        metadata.path = path;
        // metadata.instances.push({
        //     key,
        //     path
        // });
    };
};
