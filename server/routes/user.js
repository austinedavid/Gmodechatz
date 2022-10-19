const express = require('express')
const route = express.Router()
const {userUpdate, deleteUser} = require('../controllers/user')


// routes for our user
route.put('/userUpdate', userUpdate)
route.delete('/deleteUser', deleteUser)
module.exports = route