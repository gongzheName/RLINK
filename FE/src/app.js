import React from "react";

import ReactDOM from "react-dom";

import {Provider} from "react-redux";

import "antd/dist/antd.css";

import configureStore from "./redux/configureStore";

const store = configureStore();

import RLink from "./components/RLink";

ReactDOM.render(
    <Provider store={store} >
        <RLink />
    </Provider>
    ,
    document.getElementById("app"));




