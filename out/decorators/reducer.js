"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../config/types");
exports.createMeta = function (target) {
    var metadata = Reflect.getOwnMetadata(types_1.Types.REDUCER, target);
    if (!metadata) {
        metadata = {
            actions: [],
            handles: [],
            instances: [],
            key: "",
            path: "",
            sagas: []
        };
        Reflect.defineMetadata(types_1.Types.REDUCER, metadata, target);
    }
    return metadata;
};
exports.reducer = function (_a) {
    var key = _a.key, path = _a.path;
    return function (target) {
        var metadata = exports.createMeta(target);
        metadata.key = key;
        metadata.path = path;
    };
};
//# sourceMappingURL=reducer.js.map