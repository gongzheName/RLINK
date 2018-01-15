import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    HashRouter
} from "react-router-dom";

import routerArrs from "../routes/index";

import Nav1 from "./layout/content/Nav1";
import Home from "./layout/content/Home";
import Login from "./layout/header/Login";
import ManagerOperation from "../components/layout/content/ManagerOperation";
import SearchList from "./layout/content/SearchList";
import BatchProcess from "./layout/content/BatchProcess";
import UserAdd from "./AdminOperation/user/UserAdd";
import UserQuery from "./AdminOperation/user/UserQuery";
import UserUpdate from "./AdminOperation/user/UserUpdate";

import LinkAdd from "./AdminOperation/link/LinkAdd";
import LinkQuery from "./AdminOperation/link/LinkQuery";

import CtgrQuery from "./AdminOperation/ctgr/CtgrQuery";

const admin_mng = {
    path:'/mng-oprt',
    component:ManagerOperation,
    dropdown: true,
    children: [{
        path:'/usr-mng',
        component:Nav1,
        navTitle: "用户管理"
    },{
        path:'/link-mng',
        component:Nav1,
        navTitle: "链接管理"
    },{
        path:'/ctgr-mng',
        component:Nav1,
        navTitle: "用户管理"
    },{
        path:'/icon-mng',
        component:Nav1,
        navTitle: "用户管理"
    }],
    navTitle: "管理员操作"
};


if(localStorage.getItem("login")=="success_local"){
    let ts_login = parseInt(localStorage.getItem("loginTimeStamp"));
    let ts = new Date().getTime();
    if((ts-ts_login)/(1000*3600*24)<=30){
        routerArrs.push(admin_mng);
    }
}


const LinkRouters = (routerArr) => {
    return routerArr.map( (e,i) => {
        e.children && e.children.length && LinkRouters(e.children);
        return  (<Route path={e.path} component={e.component} key={i} />)

    })
};

class RLink extends React.Component{
    constructor(props){
        super(props)
    }
    render (){
        return (
            <HashRouter>
                <div>
                    {LinkRouters(routerArrs)}

                    <Route path="/home" component={Home} />
                    <Route path="/usr-mng" component={UserQuery} />
                    <Route path="/usr-add" component={UserAdd} />
                    <Route path="/usr-upd" component={UserUpdate} />
                    <Route path="/link-mng" component={LinkQuery} />
                    <Route path="/link-add" component={LinkAdd} />
                    <Route path="/ctgr-mng" component={CtgrQuery} />
                    <Route path="/icon-mng" component={Nav1} />
                    <Route path="/search" component={SearchList} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={UserAdd} />
                    <Route path="/batchprocess" component={BatchProcess} />

                </div>
            </HashRouter>
        )
    }
}
export default RLink;