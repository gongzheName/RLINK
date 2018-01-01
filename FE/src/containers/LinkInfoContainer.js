/*
 *connect: fn 调用两次(mapStateToProps, mapDispatchToProps && state和dispatch传入组件)
 *dispatch: redux中执行操作时, 需要调用dispatch函数并传递action来调用reducer
 */

import {connect} from "react-redux";

import AddInfo from "../components/AdminOperation/link/LinkAdd";

import {
    addLink
} from "../actions/index";

function mapStateToProps(state) {
    return{
        test: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addLink: () => dispatch(addLink())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInfo);





