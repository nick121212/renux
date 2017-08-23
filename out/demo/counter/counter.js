"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redux = require("redux");
var redux_actions_1 = require("redux-actions");
var inversify_1 = require("inversify");
var Immutable = require("immutable");
var index_1 = require("../../index");
var CounterReducer = (function () {
    function CounterReducer() {
    }
    CounterReducer.prototype.incAction = function (prefix, dispatch) {
        dispatch(redux_actions_1.createAction(prefix + "-INC")());
    };
    CounterReducer.prototype.decAction = function (prefix, dispatch) {
        dispatch(redux_actions_1.createAction(prefix + "-DEC")());
    };
    CounterReducer.prototype.inc = function (state) {
        var count = state.get("count");
        return state.setIn(["count"], count + 1);
    };
    CounterReducer.prototype.dec = function (state) {
        var count = state.get("count");
        return state.setIn(["count"], count - 1);
    };
    return CounterReducer;
}());
tslib_1.__decorate([
    index_1.action("INC"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", void 0)
], CounterReducer.prototype, "incAction", null);
tslib_1.__decorate([
    index_1.action("DEC"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", void 0)
], CounterReducer.prototype, "decAction", null);
tslib_1.__decorate([
    index_1.handle("INC"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], CounterReducer.prototype, "inc", null);
tslib_1.__decorate([
    index_1.handle("DEC"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], CounterReducer.prototype, "dec", null);
CounterReducer = tslib_1.__decorate([
    inversify_1.injectable(),
    index_1.reducer({
        key: "counter",
        path: "/Counter"
    })
], CounterReducer);
exports.CounterReducer = CounterReducer;
//# sourceMappingURL=counter.js.map