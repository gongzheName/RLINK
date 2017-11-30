
import {
    LINK_ADD,
    LINK_DEL,
    LINK_MOD,
    LINK_SEL
} from "../../actions/constants";

const initialState = {};

export default function reducer(state=initialState, action){
    console.log(action);
    console.log(state);
    switch (action.type){
        case LINK_ADD:
            alert("LINK_ADD");
            return "LINK_ADD_return";
            break;
        case LINK_DEL:
            alert("LINK_DEL");
            return "LINK_DEL_return";
            break;
        default:
            alert("default");
            return "default_return";
            break;
    }
}





