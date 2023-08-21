require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const registerRoute = require('./routes/authRoute');
const  messengerRoute= require('./routes/messagesRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  }).then(()=>{
    console.log("successfully connected to mongodb");
}).catch((err)=>{
    console.log(err);
})


const io = require('socket.io')(8000,{
    cors : {
         origin : '*',
         methods : ['GET','POST']
    }
})



let users = [];
const addUser = (userId,socketId,userInfo) => {
     const checkUser = users.some(u=> u.userId === userId );

     if(!checkUser){
          users.push({userId,socketId,userInfo});
     }
}
const userRemove = (socketId) => {
    users = users.filter(u=>u.socketId !== socketId );
}
const friendmsg = (id)=>{
    return users.find(u=>u.userId == id );
}
io.on('connection',(socket)=>{
    console.log('Socket is connecting...')
    socket.on('addUser',(userId,userInfo)=>{
        addUser(userId,socket.id,userInfo);
        io.emit('getUser',users);
    })

socket.on('sendMessage',(data)=>{
   
   const liveChatuser= friendmsg(data.receiverId);
    if(liveChatuser !== undefined){
        socket.to(liveChatuser.socketId).emit("getMessageFromSocket",data);
    }
})
socket.on('typingmsg',(data)=>{
 
   const liveChatuser= friendmsg(data.receiverId);
    if(liveChatuser !== undefined){
        socket.to(liveChatuser.socketId).emit("typingmsgformsocket",{
            
            senderId:data.senderId,
            receiverId:data.receiverId,
            message:data.message
            
            

        })
    }
})
socket.on('seenMessage',(msg)=>{
 
   const liveChatuser= friendmsg(msg.senderId);
    if(liveChatuser !== undefined){
        socket.to(liveChatuser.socketId).emit("seenMessageResponse",msg);
    }
})
socket.on('deliveredMessage',(msg)=>{
 
   const liveChatuser= friendmsg(msg.senderId);
    if(liveChatuser !== undefined){
        socket.to(liveChatuser.socketId).emit("deliveredMessageResponse",msg);
    }
})
socket.on('seen',(data)=>{
 
   const liveChatuser= friendmsg(data.senderId);
    if(liveChatuser !== undefined){
        socket.to(liveChatuser.socketId).emit("seenALL",data);
    }
})
const userLogout = (userId) => {
    users = users.filter(u=>u.userId !== userId)
}
socket.on('logout',userId=>{
    userLogout(userId);
})

    socket.on('disconnect',() =>{ /// browser is close it is disconnect
        console.log('user is disconnect... ');
        userRemove(socket.id);
        io.emit('getUser',users);
   })
})

app.use('/api/messenger',registerRoute);
app.use('/api/messenger',messengerRoute);






app.get("/", (req, res) => {
    res.send("API is running..");
  });






///------------------------------------- deployment


///------------------------------------- deployment



app.listen(5000,()=>{
    console.log("server is liston on port 5000");
})