const mongoose = require('mongoose')

// creating user schema
const userSchema  = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    }, 
    password:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    profileUrl:{
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model("chatzUsers", userSchema)