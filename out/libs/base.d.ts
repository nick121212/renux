/// <reference types="react" />
import * as React from "react";
export declare class BaseComponent<P, S> extends React.Component<P, S> {
    constructor(props: P, context: S);
    shouldComponentUpdate(nextProps: P, nextState: S): boolean;
}
