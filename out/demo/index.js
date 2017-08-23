"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var Immutable = require("immutable");
var recompose_1 = require("recompose");
var index_1 = require("../index");
var counter_1 = require("./counter/counter");
var list_1 = require("./counter/list");
var edit_1 = require("./counter/edit");
var types_1 = require("../config/types");
var edit_2 = require("./components/edit");
var counter_2 = require("./components/counter");
var Perf = require("react-addons-perf");
var react_router_redux_1 = require("react-router-redux");
var redux_immutable_1 = require("redux-immutable");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
index_1.proxy.loadConfig({
    "engine": "default",
    "interfaces": [{
            "key": "inter1",
            "method": "post",
            "path": "/asset/create_asset/",
            "title": ""
        }],
    "key": "test",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "http://localhost:8080/api"
    },
    "title": "运维自动发布系统接口配置"
}, {});
index_1.container.bind(types_1.Types.REDUCER).to(counter_1.CounterReducer).inSingletonScope().whenTargetNamed("CounterReducer");
index_1.container.bind(types_1.Types.REDUCER).to(list_1.ListReducer).inSingletonScope().whenTargetNamed("ListReducer");
index_1.container.bind(types_1.Types.REDUCER).to(edit_1.EditReducer).inSingletonScope().whenTargetNamed("EditReducer");
var renux = new index_1.Renux(index_1.container, "/app");
var counter = renux.get("counter");
var edit = renux.get("edit");
var list = renux.get("list");
var proxy = renux.get("modelproxy");
if (counter && edit && list && proxy) {
    proxy.init("inter1", true, { loading: false, loaded: false, error: false, data: null });
    proxy.init("inter2", true, { loading: false, loaded: false, error: false, data: null });
    proxy.init("inter3", true, { loading: false, loaded: false, error: false, data: null });
    edit.init("edit1", false, {
        formData: {},
        showDialog: false
    });
    list.init("list1", false, {
        currentPage: 1,
        currentPageSize: 10,
        data: []
    });
    counter.init("count2", false, { count: 10 });
    counter.init("count1", false, { count: 100 });
    var store = renux.createStore(redux_immutable_1.combineReducers({
        app: renux.calcReducers(),
        router: react_router_redux_1.routerReducer
    }), Immutable.Map());
    var Counter1 = recompose_1.compose(index_1.RenuxConnect([
        counter.get("count1"),
        edit.get("edit1"),
        proxy.get("inter1"),
        proxy.get("inter2"),
        function (state, a) {
            return state.getIn(["router"]);
        }
    ]))(edit_2.Edit);
    var Counter2 = recompose_1.compose(index_1.RenuxConnect([counter.get("count2")]))(counter_2.Counter);
    renux.bootstracp(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Link, { to: "/will-match" }, "Count"),
                React.createElement(react_router_dom_1.Link, { to: "/" }, "Home"),
                React.createElement(react_router_1.Switch, null,
                    React.createElement(react_router_1.Route, { path: "/", exact: true, component: Counter1 }),
                    React.createElement(react_router_1.Route, { path: "/will-match", component: Counter2 }))))));
}
window.Perf = Perf;
//# sourceMappingURL=index.js.map