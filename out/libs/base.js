"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var immutable_1 = require("immutable");
var BaseComponent = (function (_super) {
    tslib_1.__extends(BaseComponent, _super);
    function BaseComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    BaseComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var thisProps = this.props || {};
        var thisState = this.state || {};
        nextState = nextState || {};
        nextProps = nextProps || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }
        for (var key in nextProps) {
            if (!immutable_1.is(thisProps[key], nextProps[key])) {
                return true;
            }
        }
        for (var key in nextState) {
            if (!immutable_1.is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.js.map