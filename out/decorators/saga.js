"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("./reducer");
exports.saga = function (options) {
    return function (target, key, value) {
        var metadata = reducer_1.createMeta(target.constructor);
        metadata.sagas.push({ target: target, key: key, options: options, value: value });
    };
};
//# sourceMappingURL=saga.js.map