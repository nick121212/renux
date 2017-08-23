"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var index_1 = require("../../index");
var ListReducer = (function () {
    function ListReducer() {
    }
    ListReducer.prototype.inc = function (state, action) {
        return Object.assign({}, state, action.payload);
    };
    ListReducer.prototype.dec = function (state, action) {
        return Object.assign({}, state, { data: action.payload });
    };
    return ListReducer;
}());
tslib_1.__decorate([
    index_1.handle("Pagination"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], ListReducer.prototype, "inc", null);
tslib_1.__decorate([
    index_1.handle("SHOWDATA"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], ListReducer.prototype, "dec", null);
ListReducer = tslib_1.__decorate([
    inversify_1.injectable(),
    index_1.reducer({
        key: "list",
        path: "/CRUD/LIST"
    })
], ListReducer);
exports.ListReducer = ListReducer;
//# sourceMappingURL=list.js.map