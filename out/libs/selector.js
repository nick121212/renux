"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var Immutable = require("immutable");
var jpp = require("json-pointer");
var RenuxSelector = (function () {
    function RenuxSelector(_actions, _path, _prefix, _key, _rootPrefix) {
        if (_key === void 0) { _key = ""; }
        if (_rootPrefix === void 0) { _rootPrefix = ""; }
        this._actions = _actions;
        this._path = _path;
        this._prefix = _prefix;
        this._key = _key;
        this._rootPrefix = _rootPrefix;
    }
    RenuxSelector.prototype.mapStateToProps = function () {
        var _this = this;
        return reselect_1.createSelector(this.getRawState.bind(this), function (rawState) {
            if (_this._key) {
                return Immutable.Map((_a = {},
                    _a[_this._prefix] = (_b = {},
                        _b[_this._key] = rawState,
                        _b),
                    _a));
            }
            return Immutable.Map((_c = {}, _c[_this._prefix] = rawState, _c));
            var _a, _b, _c;
        });
    };
    RenuxSelector.prototype.mapDispatchToProps = function (dispatch, ownProps) {
        var actions = {};
        for (var key in this._actions) {
            if (this._actions.hasOwnProperty(key)) {
                var element = this._actions[key];
                actions[key] = element.bind(element, dispatch);
            }
        }
        if (this._key) {
            return _a = {},
                _a[this._prefix] = (_b = {},
                    _b[this._key] = actions,
                    _b),
                _a;
        }
        return _c = {}, _c[this._prefix] = actions, _c;
        var _a, _b, _c;
    };
    RenuxSelector.prototype.getRawState = function (state) {
        return state.getIn(jpp.parse(jpp.compile(jpp.parse(this._rootPrefix).concat(jpp.parse(this._path)))));
    };
    return RenuxSelector;
}());
exports.RenuxSelector = RenuxSelector;
//# sourceMappingURL=selector.js.map