const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
const cors = require('cors')

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

// creating a listening 
app.listen(PORT, ()=>{
    console.log(`app is running on port: ${PORT}`)
    mongoConnect()
})
