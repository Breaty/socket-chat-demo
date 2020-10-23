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
            let data = {...state,username:action.username || "游客",_id:action._id,loginState:true};
            console.log("用户初始化数据：",data );

            if(action.loginstate){
                storage.setItem({name:"user",value: data})
            }else{
                storage.removeItem("user");
            }
            return data;
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
            
            console.log("收到消息：",state,data, initialState.messages);
            initialState.messages.push(data);

            return [...initialState.messages];
       default:
            //这里需要判断是否为undefined
            // return state;
            return [];
    }  
}