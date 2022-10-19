const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// creating a new user
const createUser = async(req, res)=>{
    const{password} = req.body 
    
    const hashedPasword =  bcrypt.hashSync(password, 10)
    try {
        const user = new User({...req.body, password: hashedPasword})
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error)
    }
}

// loggingin a user
const loginUser = async(req, res)=>{
  

    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
           return res.status(404).send("you are not registered")
        }
        const verifiedPassword = await bcrypt.compare(req.body.password, user.password)
        if(!verifiedPassword){
           return res.status(404).send("password do not match")
        }

        // we create jwt for a verified login user
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
       
        const {password, ...others} = user._doc
        res.status(200).json({...others, token})
    } catch (error) {
        console.log(error)
    }
}

const checkingUser = async(req, res)=>{
    const {email, username} = req.body 

    try {
        if(email){
            const userbyemail = await User.findOne({email})
            if(userbyemail){
                 return res.status(200).send("email already exist")
            }
        }else{
            const userbyusername = await User.findOne({username})
            if(userbyusername){
                return res.status(200).send("username already exist")
            }
        }
       
       
    } catch (error) {
        console.log(error)
    }
}


// exporting our functions 
module.exports = {createUser, loginUser,checkingUser}