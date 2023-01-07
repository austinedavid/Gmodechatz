const mongoose = require('mongoose')

// creating a message schema
const messageSchema = mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    owners:{
        type: Array,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("CHATS", messageSchema)