import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";

ReactDOM.render(
    <App />,
    (document as any).getElementById("output")
);