const express = require('express')
const route = express.Router()
const {verify} = require('../verification')
const{makechat, getchat} = require('../controllers/message')

// creating the routes for the chats
route.post('/makechat', verify, makechat)
route.post('/getchat', verify, getchat)

module.exports = route