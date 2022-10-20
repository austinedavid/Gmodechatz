const express = require('express')
const route = express.Router()
const {userUpdate, deleteUser, getUsers} = require('../controllers/user')
const {verify} = require('../verification')


// routes for our user
route.put('/userUpdate/:id', verify, userUpdate)
route.delete('/deleteUser/:id',verify, deleteUser)
route.get('/getalluser', verify, getUsers)
module.exports = route