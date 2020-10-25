import { connect } from 'react-redux';
import {USER_LOGIN} from "../actions/types"
import {Storage} from "../until/until";

let socket=  null;

let socketurl = `ws://${window.location.hostname}:81/`;

function sendData(data){
    if(socket) socket.send(JSON.stringify(data))
}

function createSocket(){

    socket = new WebSocket(socketurl);

    socket.onopen = ()=>{
        let storage = new Storage();

        let _userInfo = storage.getItem("user");
        if(_userInfo){
            sendData({type:"userlogin",username:_userInfo.username, _id: _userInfo._id});
        }
    
    }
  
    return socket;
}

createSocket();

export {socket,sendData}