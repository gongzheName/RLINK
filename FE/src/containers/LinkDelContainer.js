/*
 *connect: fn 调用两次(mapStateToProps, mapDispatchToProps && state和dispatch传入组件)
 *dispatch: redux中执行操作时, 需要调用dispatch函数并传递action来调用reducer
 */

import {connect} from "react-redux";

import DelInfo from "../components/AdminOperation/link/LinkUpdate";

import {
    addLink,
    delLink,
    modLink,
    selLink
} from "../actions/index";

function mapStateToProps(state) {
    return{
        test: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addLink: () => dispatch(addLink()),
        delLink: () => dispatch(delLink()),
        modLink: () => dispatch(modLink()),
        selLink: () => dispatch(selLink())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelInfo);





