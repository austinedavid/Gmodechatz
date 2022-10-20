const jwt = require('jsonwebtoken');

// creating a middleware functions to handle verification of users

const verify = async(req, res, next)=>{
    const savedToken = req.headers.token
   
    const token = savedToken.split(" ")[1]

    // response if there is not token
    if(!token){
        return res.status(404).send("you are not authenticated")
    }
    // function to run if there is token
    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        if(error){
            return res.status(404).send("your token is expired, or does not exist")
        }else{
            req.user = user
        }

        next()
    })
}

module.exports = {verify}