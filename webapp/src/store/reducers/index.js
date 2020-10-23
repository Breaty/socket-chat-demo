import {combineReducers} from "redux";
import {userInfo,sendMessage,onNewMessage} from "./reducer";

let rootReducer = combineReducers({
    userInfo:userInfo,
    // sendMessage:sendMessage,
    messages:onNewMessage
});

export default rootReducer;