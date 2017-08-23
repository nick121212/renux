"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("./reducer");
exports.handle = function (type) {
    return function (target, key, value) {
        var metadata = reducer_1.createMeta(target.constructor);
        metadata.handles.push({ target: target, key: key, type: type, value: value });
    };
};
//# sourceMappingURL=handle.js.map