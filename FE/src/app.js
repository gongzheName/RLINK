import React from "react";

import ReactDOM from "react-dom";

import {Provider} from "react-redux";

import "antd/dist/antd.css";

import {Layout, Menu, Breadcrumb, Icon} from "antd";

import LinkInfoContainer from "./containers/LinkInfoContainer";

import LinkDelContainer from "./containers/LinkDelContainer";

import configureStore from "./redux/configureStore";

const store = configureStore();

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class App extends React.Component {
    render(){
        //console.log(Menu.Item)
        return(

            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo"></div>

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                            style={{lineHeight: '64px', height:"64px"}}
                        >
                            <Menu.Item key={1}>nav 1</Menu.Item>
                            <Menu.Item key={2}>nav 2</Menu.Item>
                            <Menu.Item key={3}>nav 3</Menu.Item>
                            <Menu.Item key={4}>nav 4</Menu.Item>

                        </Menu>
                    </Header>

                </Layout>
            </div>

        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));




