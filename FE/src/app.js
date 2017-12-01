import React from "react";

import ReactDOM from "react-dom";

import {Provider} from "react-redux";

import "antd/dist/antd.css";

import LinkInfoContainer from "./containers/LinkInfoContainer";

import LinkDelContainer from "./containers/LinkDelContainer";

import configureStore from "./redux/configureStore";

const store = configureStore();

class App extends React.Component {
    render(){
        return(

            <Provider store={store}>

                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div style={{border:"none",padding:"0px 10px"}}
                             className="panel panel-default">

                            <LinkInfoContainer />

                            <LinkDelContainer />
                        </div>
                    </div>

                </div>
            </Provider>


        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));




