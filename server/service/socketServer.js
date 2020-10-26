
let mongoose = require('mongoose');
var WebSocketServer = require('ws').Server;
let {ip, port} = require('../config.json');
// let assetService = require("./asset.service");

PORT = process.env.PORT || port;

if (process.argv.length<4){
    // console.log("You can start command: node server.js -p [port]");
}
else if(process.argv[2] === "-p" || process.argv[2] === "-port" || process.argv[2] === "-PORT")
{
    PORT = parseInt(process.argv[3]); 
}

let ObjectId = mongoose.Types.ObjectId;

let socketManager = {};
let userSocketMap = new Map();//user ---> wsid
let socketUserMap = new Map();//wsid ---> user

function addCollection(id, socket){
    socketManager[id] = socket;
}

function setUserLogin(id, userid){
    userSocketMap.set(userid,id);
    socketUserMap.set(id,userid);
}

function getWsIdByuserId(userid){
    let wsid = userSocketMap.get(userid);
    return wsid;
}

function deleteCollection(id){
    delete socketManager[id];
    let userid = socketUserMap.get(id);
    if (userid)
    {
        userSocketMap.delete(userid);
        socketUserMap.delete(id);
    }
}

wss = new WebSocketServer({ port: PORT+1 });



wss.on('connection', function (ws) {
    console.log('\n socket链接成功 ');

    ws.on('message', function (data) {
        let message =  null;
        try{
            message = JSON.parse(data)
        }catch(e){
            console.log(e);
        }

        if (message.type === 'init'){
            let wsid = ObjectId();
            ws.id = wsid;
            ws.send(JSON.stringify({type:"init", groupid:wsid}));
            addCollection(wsid,ws);
        }
        
        else if (message.type === 'reconnect'){
            let wsid = message.groupid;
            ws.id = wsid;
            ws.send(JSON.stringify({groupid:wsid}));
            addCollection(wsid,ws);
        }


        else if(message.type==="message")
        {
            ws.send(JSON.stringify({message:"试试id"}))
        }

        else if (message.type==="userlogin"){
            ws.id = message._id ? ObjectId(message._id): ObjectId();
            ws.username = message.username;
            let data = {type:"userlogin", _id: ws.id, username: message.username,loginState:true};
            ws.send(JSON.stringify(data));
            addCollection(ws.id,ws);
        }

        else if (message.type ==='newMessage'){
            broadcast(message);
        }
    
    });

    ws.on('close', function (){
        console.log("websocket断掉链接");
        deleteCollection(ws.id);
    })


    ws.on('error', function (err){
        console.log("websocket链接报错", err);
        deleteCollection(ws.id);
    })

});

function sendMessage(wsid, message, userid){
    if(userid){
        wsid = getWsIdByuserId(userid)
    }

    if (socketManager[wsid])
    {
        socketManager[wsid].send(JSON.stringify(message))
    }
}

function broadcast(data){
    console.log("廣播消息：", data)
    wss.clients.forEach(function each(client) {
       client.send(JSON.stringify(data));
    });
}

console.log("\n websocket listen at : ",  PORT+1,'\n');

module.exports = {

     sendMessage

}