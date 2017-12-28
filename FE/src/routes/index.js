import HeaderComponent from "../components/layout/header/HeaderComponent"
import Nav1 from "../components/layout/content/Nav1";
import ManagerOperation from "../components/layout/content/ManagerOperation";
import Nav3 from "../components/layout/content/Nav3";
import Nav4 from "../components/layout/content/Nav4";

let routerArrs = [
    {
        path:'/',
        component:HeaderComponent,
        dropdown: false,
        navTitle: "首页"
    },{
        path:'/nav1',
        component:Nav1,
        dropdown: false,
        navTitle: "预留板块1"
    },
    {
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
    },
    {
        path:'/nav3',
        component:Nav3,
        dropdown: false,
        navTitle: "预留板块2"
    },
    {
        path:'/nav4',
        component:Nav4,
        dropdown: false,
        navTitle: "预留板块3"
    }
]

export default routerArrs;


