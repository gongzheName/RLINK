import React from "react";
import {Layout, Menu, Icon, Dropdown} from "antd";

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import routerArrs from "../../../routes/index";

import Nav1 from "../content/Nav1"

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

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
        }else{
            return(<Menu.Item key={i}><Link to={el.path}>{el.navTitle}</Link></Menu.Item>)
        }
        //return(<Menu.Item key={i}><Link to={el.path}>{el.navTitle}</Link></Menu.Item>)
    })
);

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(routerArrs, "constructor")
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
            <Layout className="layout">
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
                </Header>
            </Layout>
        )
    }
}

export default HeaderComponent;





