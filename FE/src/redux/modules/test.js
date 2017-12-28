
import {
    LINK_ADD,
    LINK_DEL,
    LINK_MOD,
    LINK_SEL
} from "../../actions/constants";

const initialState = {};

export default function reducer(state=initialState, action){
    switch (action.type){
        case LINK_ADD:
            return "LINK_ADD_return";
            break;
        case LINK_DEL:
            return "LINK_DEL_return";
            break;
        default:
            return "default_return";
            break;
    }
}





