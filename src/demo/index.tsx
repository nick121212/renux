import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import { createStore, bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";
import * as Immutable from "immutable";
import { compose } from "recompose";

import { Renux, container, RenuxConnect, proxy as modelProxy } from "../index";

import { CounterReducer } from "./counter/counter";
import { ListReducer } from "./counter/list";
import { EditReducer } from "./counter/edit";
import { Types } from "../config/types";
import { Edit } from "./components/edit";
import { Counter } from "./components/counter";
import * as Perf from "react-addons-perf";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import { BrowserRouter, Link } from "react-router-dom";
import { Switch, Route } from "react-router";

modelProxy.loadConfig({
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

container.bind<CounterReducer>(Types.REDUCER).to(CounterReducer).inSingletonScope().whenTargetNamed("CounterReducer");
container.bind<ListReducer>(Types.REDUCER).to(ListReducer).inSingletonScope().whenTargetNamed("ListReducer");
container.bind<EditReducer>(Types.REDUCER).to(EditReducer).inSingletonScope().whenTargetNamed("EditReducer");

const renux = new Renux(container, "/app");

let counter = renux.get("counter");
let edit = renux.get("edit");
let list = renux.get("list");
let proxy = renux.get("modelproxy");

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

    const store = renux.createStore(combineReducers({
        app: renux.calcReducers(),
        router: routerReducer
    }), Immutable.Map());

    const Counter1 = compose(
        RenuxConnect([
            counter.get("count1"),
            edit.get("edit1"),
            proxy.get("inter1"),
            proxy.get("inter2"),
            (state: any, a: any) => {
                return state.getIn(["router"]);
            }])
    )(Edit);

    const Counter2 = compose(
        RenuxConnect([counter.get("count2")])
    )(Counter);

    renux.bootstracp(<Provider store={store}>
        <BrowserRouter>
            <div>
                <Link to="/will-match">Count</Link>
                <Link to="/">Home</Link>
                <Switch>
                    <Route path="/" exact component={Counter1} />
                    <Route path="/will-match" component={Counter2} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>);
}

(window as any).Perf = Perf;
