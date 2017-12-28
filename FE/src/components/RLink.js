import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    HashRouter
} from "react-router-dom";

import routerArrs from "../routes/index";

import Nav1 from "./layout/content/Nav1";
import WrappedRegistrationForm from "./AdminOperation/user/UserAdd";

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

                    <Route path="/usr-mng" component={WrappedRegistrationForm} />
                    <Route path="/link-mng" component={Nav1} />
                    <Route path="/ctgr-mng" component={Nav1} />
                    <Route path="/icon-mng" component={Nav1} />
                </div>
            </HashRouter>
        )
    }
}
export default RLink;