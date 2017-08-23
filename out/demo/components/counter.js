"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var base_1 = require("../../libs/base");
var Counter = (function (_super) {
    tslib_1.__extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.render = function () {
        var state = this.props.state.get("counter").toJS();
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.props.counter.incAction.bind(this) }, " + "),
            React.createElement("button", { onClick: this.props.counter.decAction.bind(this) }, " - "),
            "Counter: ",
            state.count));
    };
    return Counter;
}(base_1.BaseComponent));
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map