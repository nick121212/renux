import * as React from "react";
import { BaseComponent } from "../../libs/base";

export class Counter extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let state = this.props.state.get("counter").toJS();
        // const {state} = this.props;

        return (
            <div>
                <button onClick={this.props.counter.incAction.bind(this)}> + </button>
                <button onClick={this.props.counter.decAction.bind(this)}> - </button>
                Counter: {state.count}
            </div>
        );
    }
}
