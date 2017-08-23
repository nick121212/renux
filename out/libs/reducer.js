"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var modelproxy_1 = require("modelproxy");
var jpp = require("json-pointer");
var redux_actions_1 = require("redux-actions");
var Immutable = require("immutable");
var selector_1 = require("./selector");
var RenuxReducer = (function (_super) {
    tslib_1.__extends(RenuxReducer, _super);
    function RenuxReducer(_meta, _reducerMaps) {
        var _this = _super.call(this) || this;
        _this._meta = _meta;
        _this._reducerMaps = _reducerMaps;
        return _this;
    }
    RenuxReducer.prototype.init = function (key, keyPath, initialState) {
        if (initialState === void 0) { initialState = {}; }
        var deal = {};
        var actions = {};
        var path = jpp.compile(jpp.parse(this._meta.path).concat([key]));
        this._meta.handles.forEach(function (handle) {
            var originHandle = handle.value.value;
            if (handle.key) {
                deal[key ? key + "-" + handle.type : handle.type] = handle.target[handle.key];
            }
        });
        this._meta.actions.forEach(function (action) {
            actions[action.key] = action.value.value.bind(action.target, key);
        });
        jpp.set(this._reducerMaps, path, redux_actions_1.handleActions(deal, Immutable.Map(initialState)));
        this.add(key, new selector_1.RenuxSelector(actions, path, this._meta.key, keyPath ? key : "", this._meta.rootPrefix || ""));
    };
    return RenuxReducer;
}(modelproxy_1.BaseFactory));
exports.RenuxReducer = RenuxReducer;
//# sourceMappingURL=reducer.js.map