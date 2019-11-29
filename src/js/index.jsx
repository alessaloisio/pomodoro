import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "../assets/css/nucleo-icons.css";
import "../assets/scss/blk-design-system-react.scss";
import "../assets/demo/demo.css";

import Index from "./views/index-page.jsx";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={"/"} render={props => <Index {...props} />} />
        </Switch>
    </BrowserRouter>,
    document.querySelector("#root"),
);
