"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var base_1 = require("../../libs/base");
var counter_1 = require("./counter");
var Edit = (function (_super) {
    tslib_1.__extends(Edit, _super);
    function Edit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Edit.prototype.render = function () {
        var _this = this;
        var state = this.props.state.toJS();
        var buttons = [];
        for (var key in this.props.modelproxy) {
            if (this.props.modelproxy.hasOwnProperty(key)) {
                var element = this.props.modelproxy[key];
                buttons.push(React.createElement("button", { key: key, disabled: state.modelproxy[key].loading, onClick: element.executeAction.bind(this, {
                        data: state.edit.formData,
                        key: key,
                        ns: "test"
                    }) },
                    key,
                    "\u63D0\u4EA4\uFF0C\u6D4B\u8BD5\u63A5\u53E3"));
            }
        }
        return (React.createElement("div", null,
            React.createElement("input", { type: "text", onChange: function (e) {
                    _this.props.edit.editAction({ a: e.currentTarget.value });
                } }),
            React.createElement("input", { type: "text", onChange: function (e) {
                    _this.props.edit.editAction({ b: e.currentTarget.value });
                } }),
            React.createElement("input", { type: "checkbox", onChange: function (e) {
                    _this.props.edit.toggleDialogAction(e.currentTarget.checked);
                } }),
            state.edit.showDialog && "State:" + JSON.stringify(state.edit.formData),
            React.createElement(counter_1.Counter, tslib_1.__assign({}, this.props)),
            buttons,
            JSON.stringify(state.modelproxy)));
    };
    return Edit;
}(base_1.BaseComponent));
exports.Edit = Edit;
//# sourceMappingURL=edit.js.map