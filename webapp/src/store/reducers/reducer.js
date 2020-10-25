import * as types from "../../actions/types";
import {Storage} from "../../until/until";


let storage = new Storage();

let _userInfo = storage.getItem("user");

const initialState = {
    userinfo:{loginState:false},
    messages:[]
}

export function userInfo(state={loginState: false}, action) {

    switch (action.type){
        case types.USER_LOGIN:
            let data = {...state,username:action.username || "游客",_id:action._id,loginState:action.loginState};

            if(data.loginState){
                storage.setItem({name:"user",value: data})
            }else{
                storage.removeItem("user");
            }
            return data;
        case types.USER_LOGIN_OUT:
            storage.removeItem("user");
            return {loginState:false};
        default:
            //这里需要判断是否为undefined
            // return state;
            return state;
    }     
}

export function onNewMessage(state = [], action){

    switch (action.type){
        case types.NEW_MESSAGE:
            let data = action;
            
            initialState.messages.push(data);

            return [...initialState.messages];
       default:
            //这里需要判断是否为undefined
            // return state;
            return [];
    }  
}