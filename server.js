const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);



const path = require('path');
const mainpath = path.join(__dirname,"../");

app.use(express.static(mainpath));

const port = 8080 || process.env.PORT;

app.get('/',(req,res)=>{
    res.sendFile(mainpath+'/index.html');
})

// 1
const activeusers={};

io.on('connect',(socket)=>{
    socket.on("new_user_join",(username)=>{
        console.log("new user" , username);
        activeusers[socket.id]=username;
        socket.broadcast.emit("user_joined",username);

        //when user leave
        socket.on("disconnect",()=>{
            console.log("user-left",username);
            socket.broadcast.emit("user_left",username);
        })
    })

    socket.on('send',(message)=>{
        console.log(message);
        socket.broadcast.emit("recieve",{
            message : message,
            username : activeusers[socket.id]
        })
    })
})

server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})
