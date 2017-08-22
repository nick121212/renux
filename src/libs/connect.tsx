import * as React from "react";
import * as redux from "redux";
import { pure } from "recompose";
import * as ReactRedux from "react-redux";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { bindActionCreators } from "redux";
import * as jpp from "json-pointer";
import * as Immutable from "immutable";
import { createSelector, ParametricSelector } from "reselect";

import { RenuxSelector } from "./selector";
import { BaseComponent } from "./base";

export const RenuxConnect = (selectors: Array<RenuxSelector | null | ParametricSelector<any, any, any>>): Function => {
    let maps: Array<ParametricSelector<any, any, any>> = [];

    selectors.forEach((select: RenuxSelector | null) => {
        if (select) {
            if (select.mapStateToProps) {
                maps.push(select.mapStateToProps());
            } else {
                maps.push(select as any);
            }
        }
    });

    return (Component: new () => React.Component<any, any>): InferableComponentEnhancerWithProps<any, any> => {
        class Hoc extends BaseComponent<any, any> {
            constructor(props?: any, context?: any) {
                super(props, context);
            }

            public render(): JSX.Element | false | null {
                return (<span>
                    <Component {...this.props} />
                </span>);
            }
        }

        return connect((state: Immutable.Map<string, any>) => {
            return {
                state: createSelector(maps as any, (...args: Array<any>) => {
                    return args.reduce((prev: Immutable.Map<any, any>, cur: any) => {
                        return prev.mergeDeep(Immutable.Map.isMap(cur) ? cur.toJS() : cur);
                    }, Immutable.Map());
                })(state)
            };
        }, (dispatch: redux.Dispatch<any>, ownProps: any) => {
            return selectors.reduce((prev: Immutable.Map<any, any>, cur: RenuxSelector | null) => {
                if (!cur || !cur.mapDispatchToProps) {
                    return prev;
                }
                return prev.mergeDeep(cur.mapDispatchToProps(dispatch, ownProps));
            }, Immutable.Map()).toJS();
        })(Hoc) as any;
    };
};
