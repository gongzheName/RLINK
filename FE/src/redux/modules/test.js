
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
            console.log("LINK_ADD");
            return "LINK_ADD_return";
            break;
        case LINK_DEL:
            console.log("LINK_DEL");
            return "LINK_DEL_return";
            break;
        default:
            console.log("default");
            return "default_return";
            break;
    }
}





