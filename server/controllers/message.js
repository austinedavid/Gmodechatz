const Messaging = require('../models/message')

// creating function for creation of chat
const makechat = async(req, res)=>{
    const{message, to} = req.body
    const from = req.user.id
    try {
        const successfulMsg = await Messaging.create({
            message,
            owners: [from, to],
            sender: from
        })

        res.status(200).json(successfulMsg)
    } catch (error) {
        console.log(error)
    }
}

// creating a function for getting a chat
const getchat = async(req, res)=>{
    const {to} = req.body
    const from = req.user.id
    try {
        const gottenMessage = await Messaging.find({
            owners: {$all: [from, to]}
        })
        res.status(200).json(gottenMessage)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {makechat, getchat}