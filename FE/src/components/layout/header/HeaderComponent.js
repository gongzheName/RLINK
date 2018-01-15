import React from "react";
import {Layout, Menu, Icon, Dropdown, Input, Button} from "antd";

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import routerArrs from "../../../routes/index";

import "./index.less";

const {Header} = Layout;
const Search = Input.Search;

let login_state=false;
let ts_login = parseInt(localStorage.getItem("loginTimeStamp"));
let ts = new Date().getTime();
if((ts-ts_login)/(1000*3600*24)<=30){
    login_state=true;
}

const login = ()=>{
    console.log(123);
    window.location.href="#/login";
}

const logout = ()=>{
   localStorage.removeItem("loginTimeStamp");
   localStorage.removeItem("login");
   window.location.reload();
}

const menu = (
    <Menu>
        <Menu.Item key="1">
            <Link to="/usr-mng">用户管理</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/link-mng">链接管理</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/ctgr-mng">类别管理</Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to="/icon-mng">图标管理</Link>
        </Menu.Item>
    </Menu>
)


// 路由-导航
const RouterNavs = (arr)=>(
    arr.map((el, i)=>{
        if(el.dropdown){
            return (
                <Menu.Item key={i}>
                    <Dropdown overlay={menu}>
                        <div className="ant-dropdown-link">
                            {el.navTitle}
                            <Icon type="down" />
                        </div>
                    </Dropdown>
                </Menu.Item>
            )
        }else if(!el.dropdown){
            return(<Menu.Item key={i}><Link to={el.path}>{el.navTitle}</Link></Menu.Item>)
        }
    })
);

class HeaderComponent extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate() {
        return true;        // 记得要返回true
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }
    render(){
        return(
            <Layout className="layout" style={{}}>
                <Header className="header">
                    <div className="logo" />

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["0"]}
                        style={{lineHeight: '64px', height:"64px"}}
                    >
                        {RouterNavs(routerArrs)}

                    </Menu>
                    <Button
                        type="default"
                        size="large"
                        ghost
                        onClick={login_state?logout:login}
                        style={{margin: "0px 20px",position:"absolute",right:"50px",top:"16px"}}
                      >
                        {login_state?"注销":"登录"}
                      </Button>
                      <Search
                        placeholder="链接名称"
                        style={{ width: 200,position:"absolute",right:200,top:0}}
                        className="search-wrap"
                        onSearch={value => {window.location.href="/#/search?wd="+value}}
                      />
                </Header>
            </Layout>
        )
    }
}

export default HeaderComponent;





