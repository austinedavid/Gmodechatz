const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const cors = require('cors')
const io = new Server(httpServer, {
    cors:{
        origin: "https://gmodechatz.netlify.app",
        credential: true
    }
})

mongoose.set('strictQuery', false)

// we connect our mongoose to the data base
const mongoConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB__URL ).then(res=>{
            console.log('db connecion successfull')
        })
    } catch (error) {
        console.log(error)
    }
}
// creating a port 
const PORT =  process.env.PORT || 5000

// creating our middleware
app.use(express.json())
app.use(cors())

// creating our differnt routes
app.use('/app', authRoute)
app.use('/app', userRoute)
app.use('/app', messageRoute)
app.get('/get', (req, res)=>{
    res.send(" checking for my end point")
})

// creating a listening 
httpServer.listen(PORT, ()=>{
    console.log(`app is running on port: ${PORT}`)
    mongoConnect()
})

// below here, we run all the neccesary functions for our socket.io

// creating a global variable to contain our online users
global.onlineUsers = new Map()
console.log(onlineUsers)
// creating our connecting to listen and also emit events
io.on("connection", (socket)=>{
   
    global.chatSocket = socket;
    // here, we push any user that connect from the client to the global onlineuser variable
    socket.on("add-user", (userId)=>{
        console.log(socket.id)
        onlineUsers.set(userId, socket.id)
    })

    // here we will then listen to the individual message sent, and also check if the receiver is online
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
})
