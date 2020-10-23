const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const myParser = require('body-parser');
const config = require('./config.json');

let { DB_URL, port } = config

let app = express();

app.use(myParser.json());
app.use(myParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname,'web')));
// app.use("/assets",express.static(path.join(__dirname,'assets')));


let mongoErr = false;

/* mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true,useFindAndModify: true, useUnifiedTopology:true  });
mongoose.connection
.on('connected', function () {
    console.log('** Mongoose connection open to ' + DB_URL);
})
.on('disconnected', function () {
    console.log('！！！Mongoose connection disconnected');
    mongoErr = "Database not connected"
});
 */

app.all('*', function (req, res, next) {
    console.log("有请求：",mongoErr,req.method,req.path);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("X-Powered-By", ' 3.2.1');
    if (mongoErr)
    {
        console.log("!!!数据库报错：", mongoErr);
    }
    next();
});  

var server = http.createServer(app);

server.listen(port,config.ip,() => {
    console.log(`App listening at port:` + config.ip +':'+ port);
});

let {sendMessage}  = require("./service/socketServer")

// app.use("/login", userLogin);
// app.use("/user", require("./router/user"));