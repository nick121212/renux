"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("./reducer");
exports.action = function (type) {
    return function (target, key, value) {
        var metadata = reducer_1.createMeta(target.constructor);
        metadata.actions.push({ target: target, key: key, type: type, value: value });
    };
};
//# sourceMappingURL=action.js.map