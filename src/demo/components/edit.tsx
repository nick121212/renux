import * as React from "react";
import { BaseComponent } from "../../libs/base";
import { Counter } from "./counter";

export class Edit extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let state = this.props.state.toJS();
        let buttons = [];

        for (let key in this.props.modelproxy) {
            if (this.props.modelproxy.hasOwnProperty(key)) {
                let element = this.props.modelproxy[key];

                buttons.push(<button key={key} disabled={state.modelproxy[key].loading} onClick={element.executeAction.bind(this, {
                    data: state.edit.formData,
                    key: key,
                    ns: "test"
                })}>{key}提交，测试接口</button>);
            }
        }

        return (
            <div>
                <input type="text" onChange={(e) => {
                    this.props.edit.editAction({ a: e.currentTarget.value });
                }} />
                <input type="text" onChange={(e) => {
                    this.props.edit.editAction({ b: e.currentTarget.value });
                }} />

                <input type="checkbox" onChange={(e: any) => {
                    this.props.edit.toggleDialogAction(e.currentTarget.checked);
                }} />

                {state.edit.showDialog && "State:" + JSON.stringify(state.edit.formData)}

                <Counter {...this.props} />

                {
                    buttons
                }

                {JSON.stringify(state.modelproxy)}

            </div>
        );
    }
}
