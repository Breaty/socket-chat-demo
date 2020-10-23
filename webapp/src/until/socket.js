import { connect } from 'react-redux';
import {USER_LOGIN} from "../actions/types"

let socket=  null;

let socketurl = `ws://${window.location.hostname}:81/`;

function createSocket(){

    socket = new WebSocket(socketurl);
    return socket;
}

function sendData(data){
    if(socket) socket.send(JSON.stringify(data))
}

createSocket();

export {socket,sendData}