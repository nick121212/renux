"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redux = require("redux");
var redux_actions_1 = require("redux-actions");
var inversify_1 = require("inversify");
var Immutable = require("immutable");
var effects_1 = require("redux-saga/effects");
var redux_saga_1 = require("redux-saga");
var index_1 = require("../index");
exports.ActionTypes = {
    mpe: "MODELPROXY_EXECUTE",
    mpee: "MODELPROXY_EXECUTE_ERROR",
    mpep: "MODELPROXY_PRE_EXECUTE",
    mpes: "MODELPROXY_EXECUTE_SUCCESS",
};
var ModelProxyReducer = (function () {
    function ModelProxyReducer() {
    }
    ModelProxyReducer.prototype.executeAction = function (prefix, dispatch, options) {
        dispatch(redux_actions_1.createAction(exports.ActionTypes.mpe)({ options: options, prefix: prefix }));
    };
    ModelProxyReducer.prototype.executePreAction = function (prefix, dispatch) {
        return dispatch(redux_actions_1.createAction(prefix + "-" + exports.ActionTypes.mpep)());
    };
    ModelProxyReducer.prototype.executeSuccessAction = function (prefix, dispatch, err) {
        return dispatch(redux_actions_1.createAction(prefix + "-" + exports.ActionTypes.mpes)(err));
    };
    ModelProxyReducer.prototype.executeErrorAction = function (prefix, dispatch, data) {
        return dispatch(redux_actions_1.createAction(prefix + "-" + exports.ActionTypes.mpee)(data));
    };
    ModelProxyReducer.prototype.execute = function (state) {
        return state.merge({
            data: null,
            error: false,
            loaded: false,
            loading: true,
        });
    };
    ModelProxyReducer.prototype.success = function (state, act) {
        return state.merge({
            data: act.payload,
            error: false,
            loaded: true,
            loading: false,
        });
    };
    ModelProxyReducer.prototype.error = function (state, act) {
        return state.merge({
            data: act.payload,
            error: true,
            loaded: false,
            loading: false,
        });
    };
    ModelProxyReducer.prototype.listenExecuteAction = function (act) {
        var _a, options, prefix, ns, key, data, params, rtn, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = act.payload, options = _a.options, prefix = _a.prefix;
                    ns = options.ns, key = options.key, data = options.data, params = options.params;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 8]);
                    return [4, effects_1.put(redux_actions_1.createAction(prefix + "-" + exports.ActionTypes.mpep)())];
                case 2:
                    _b.sent();
                    return [4, effects_1.call(redux_saga_1.delay, 2000)];
                case 3:
                    _b.sent();
                    return [4, effects_1.call(index_1.proxy.execute.bind(index_1.proxy, ns, key, {
                            data: data,
                            params: params
                        }))];
                case 4:
                    rtn = _b.sent();
                    return [4, this.executeSuccessAction(prefix, effects_1.put, rtn)];
                case 5:
                    _b.sent();
                    return [3, 8];
                case 6:
                    e_1 = _b.sent();
                    return [4, this.executeErrorAction(prefix, effects_1.put, e_1)];
                case 7:
                    _b.sent();
                    return [3, 8];
                case 8: return [2];
            }
        });
    };
    return ModelProxyReducer;
}());
tslib_1.__decorate([
    index_1.action(exports.ActionTypes.mpe),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ModelProxyReducer.prototype, "executeAction", null);
tslib_1.__decorate([
    index_1.action(exports.ActionTypes.mpep),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", void 0)
], ModelProxyReducer.prototype, "executePreAction", null);
tslib_1.__decorate([
    index_1.action(exports.ActionTypes.mpes),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, Error]),
    tslib_1.__metadata("design:returntype", void 0)
], ModelProxyReducer.prototype, "executeSuccessAction", null);
tslib_1.__decorate([
    index_1.action(exports.ActionTypes.mpee),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ModelProxyReducer.prototype, "executeErrorAction", null);
tslib_1.__decorate([
    index_1.handle(exports.ActionTypes.mpep),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], ModelProxyReducer.prototype, "execute", null);
tslib_1.__decorate([
    index_1.handle(exports.ActionTypes.mpes),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], ModelProxyReducer.prototype, "success", null);
tslib_1.__decorate([
    index_1.handle(exports.ActionTypes.mpee),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], ModelProxyReducer.prototype, "error", null);
tslib_1.__decorate([
    index_1.saga({
        actionType: exports.ActionTypes.mpe,
        takeFunc: effects_1.takeEvery
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ModelProxyReducer.prototype, "listenExecuteAction", null);
ModelProxyReducer = tslib_1.__decorate([
    inversify_1.injectable(),
    index_1.reducer({
        key: "modelproxy",
        path: "/Modelproxy"
    })
], ModelProxyReducer);
exports.ModelProxyReducer = ModelProxyReducer;
index_1.container.bind(index_1.Types.REDUCER).to(ModelProxyReducer).inSingletonScope().whenTargetNamed("ModelProxyReducer");
//# sourceMappingURL=modelproxy.js.map