"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redux = require("redux");
var redux_actions_1 = require("redux-actions");
var inversify_1 = require("inversify");
var index_1 = require("../../index");
var EditReducer = (function () {
    function EditReducer() {
    }
    EditReducer.prototype.toggleDialogAction = function (prefix, dispatch, showDialog) {
        dispatch(redux_actions_1.createAction(prefix + "-SHOW")(showDialog));
    };
    EditReducer.prototype.editAction = function (prefix, dispatch, formData) {
        dispatch(redux_actions_1.createAction(prefix + "-EDIT")(formData));
    };
    EditReducer.prototype.inc = function (state, act) {
        return Object.assign({}, state, { showDialog: act.payload });
    };
    EditReducer.prototype.dec = function (state, act) {
        var formData = state.formData;
        formData = Object.assign({}, formData, act.payload);
        return Object.assign({}, state, { formData: formData });
    };
    return EditReducer;
}());
tslib_1.__decorate([
    index_1.action("SHOW"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], EditReducer.prototype, "toggleDialogAction", null);
tslib_1.__decorate([
    index_1.action("EDIT"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EditReducer.prototype, "editAction", null);
tslib_1.__decorate([
    index_1.handle("SHOW"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], EditReducer.prototype, "inc", null);
tslib_1.__decorate([
    index_1.handle("EDIT"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], EditReducer.prototype, "dec", null);
EditReducer = tslib_1.__decorate([
    inversify_1.injectable(),
    index_1.reducer({
        key: "edit",
        path: "/CRUD/EDIT"
    })
], EditReducer);
exports.EditReducer = EditReducer;
//# sourceMappingURL=edit.js.map