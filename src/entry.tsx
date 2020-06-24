import "intersection-observer";
import { h, render } from 'preact';

import { App } from "./components/app";

render(
    <App />,
    (document as any).getElementById("output")
);