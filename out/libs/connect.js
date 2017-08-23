"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var Immutable = require("immutable");
var reselect_1 = require("reselect");
var base_1 = require("./base");
exports.RenuxConnect = function (selectors) {
    var maps = [];
    selectors.forEach(function (select) {
        if (select) {
            if (select.mapStateToProps) {
                maps.push(select.mapStateToProps());
            }
            else {
                maps.push(select);
            }
        }
    });
    return function (Component) {
        var Hoc = (function (_super) {
            tslib_1.__extends(Hoc, _super);
            function Hoc(props, context) {
                return _super.call(this, props, context) || this;
            }
            Hoc.prototype.render = function () {
                return (React.createElement("span", null,
                    React.createElement(Component, tslib_1.__assign({}, this.props))));
            };
            return Hoc;
        }(base_1.BaseComponent));
        return react_redux_1.connect(function (state) {
            return {
                state: reselect_1.createSelector(maps, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return args.reduce(function (prev, cur) {
                        return prev.mergeDeep(Immutable.Map.isMap(cur) ? cur.toJS() : cur);
                    }, Immutable.Map());
                })(state)
            };
        }, function (dispatch, ownProps) {
            return selectors.reduce(function (prev, cur) {
                if (!cur || !cur.mapDispatchToProps) {
                    return prev;
                }
                return prev.mergeDeep(cur.mapDispatchToProps(dispatch, ownProps));
            }, Immutable.Map()).toJS();
        })(Hoc);
    };
};
//# sourceMappingURL=connect.js.map