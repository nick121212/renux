"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ReactDOM = require("react-dom");
var modelproxy_1 = require("modelproxy");
var redux_1 = require("redux");
var redux_immutable_1 = require("redux-immutable");
var redux_saga_1 = require("redux-saga");
var types_1 = require("../config/types");
var reducer_1 = require("./reducer");
var Renux = (function (_super) {
    tslib_1.__extends(Renux, _super);
    function Renux(_container, _rootPrefix) {
        var _this = _super.call(this) || this;
        _this._container = _container;
        _this._rootPrefix = _rootPrefix;
        _this._reducerMaps = {};
        _this.initReducers();
        return _this;
    }
    Renux.prototype.createStore = function (reducer, initialState, middlewares) {
        if (middlewares === void 0) { middlewares = []; }
        var sagaMiddleware = redux_saga_1.default();
        this._store = redux_1.createStore(reducer, initialState, redux_1.applyMiddleware.apply(void 0, [sagaMiddleware].concat(middlewares)));
        this.initSagas(sagaMiddleware);
        return this._store;
    };
    Renux.prototype.calcReducers = function (map) {
        if (map === void 0) { map = this._reducerMaps; }
        var rtns = {};
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                var element = map[key];
                if (element.constructor === Function) {
                    rtns[key] = element;
                }
                else {
                    rtns[key] = this.calcReducers(element);
                }
            }
        }
        return redux_immutable_1.combineReducers(rtns);
    };
    Renux.prototype.bootstracp = function (element, conId, cb) {
        if (conId === void 0) { conId = "root"; }
        if (cb === void 0) { cb = null; }
        ReactDOM.render(element, document.getElementById(conId), cb);
    };
    Renux.prototype.initSagas = function (sagaMiddle) {
        var reducers = this._container.getAll(types_1.Types.REDUCER);
        reducers.forEach(function (reducer) {
            var meta = Reflect.getMetadata(types_1.Types.REDUCER, reducer.constructor);
            if (meta) {
                meta.sagas.forEach(function (saga) {
                    sagaMiddle.run(function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, saga.options.takeFunc(saga.options.actionType, saga.value.value.bind(saga.target))];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    });
                });
            }
        });
    };
    Renux.prototype.initReducers = function () {
        var _this = this;
        var reducers = this._container.getAll(types_1.Types.REDUCER);
        var rtn = {};
        reducers.forEach(function (reducer) {
            var meta = Reflect.getMetadata(types_1.Types.REDUCER, reducer.constructor);
            meta.rootPrefix = _this._rootPrefix || "";
            if (meta) {
                _this.add(meta.key, new reducer_1.RenuxReducer(meta, _this._reducerMaps));
            }
        });
    };
    return Renux;
}(modelproxy_1.BaseFactory));
exports.Renux = Renux;
//# sourceMappingURL=renux.js.map