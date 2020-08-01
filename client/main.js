import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//hydrate is used for preserving server render markup and only event handlers are attached when react takes over the browser allowing intial load performance to be better

ReactDOM.hydrate(<App />, document.getElementById("root"));
