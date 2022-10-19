const express = require('express')
const route = express.Router()
const {createUser, loginUser, checkingUser} = require('../controllers/auth')

// creating the auth routes, for registration
route.post('/register', createUser)
route.post('/login', loginUser)
route.post('/checkinguser', checkingUser)

// exporting our route
module.exports = route
