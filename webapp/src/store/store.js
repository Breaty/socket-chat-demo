
import { createStore,compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';    
import rootReducer from "./reducers/index";
import {CHAT_SEND_MESSAGE} from '../actions/types';    
import {socket,sendData} from "../until/socket";
import {Storage} from "../until/until";

const middlewares = [];
middlewares.push(thunkMiddleware);

const webSocketMiddleware = store => next => action => {
    if(CHAT_SEND_MESSAGE === action.type) {
        if(null !== socket) {
            console.log("發送消息！：",action)
            sendData(action.data);
        }
    }

    next(action)
}

middlewares.push(webSocketMiddleware);



const initialState = localStorage.getItem("store") ? JSON.parse(localStorage.getItem("store")) : {};
const win = window;
const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);
let store = null;
if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, initialState, storeEnhancers);
} else {
    store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))
}

socket.onmessage = (m) => {
    try {
        let message = JSON.parse(m.data)
        store.dispatch(message)
    } catch(e) {
        console.error(e)
        throw(e)
    }
}


let storage = new Storage();

let _userInfo = storage.getItem("user");

if(_userInfo){
    // store.dispatch({type:"CHAT_SEND_MESSAGE", data:{type:"userlogin",username:_userInfo.username, _id: _userInfo._id}});
}

export default store