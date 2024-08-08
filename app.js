const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended : true}));

const PORT = process.env.PORT || 3000;
server.listen(PORT , () => {
    console.log(`Listening at port no. ${PORT}`);
});

app.get('/', function(req,res){
    res.render("index");
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});
