const User = require('../models/user')

// creating controllers for updating user
const userUpdate = async(req, res)=>{
    const userId = req.user.id
    const {id} = req.params
    try {
        if(userId !== id){
            return res.status(404).send("you can only update your profiles")
        }else{
            const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser)
        }
    } catch (error) {
        console.log(error)
    }
}

// deleting user account
const deleteUser = async(req, res)=>{
    const userId = req.user.id 
    const {id} = req.params
    try {
        if(userId !== id){
            return res.status(404).send("you can only delete your own account")
        }else{
            await User.findByIdAndDelete(id)
            res.status(200).send("Account deleted successfully")
        }
    } catch (error) {
        conspole.log(error)
    }
}

// here we get all users
const getUsers = async(req, res)=>{
    const userId = req.user.id
    try {
        if(!userId){
            res.status(404).send("you cannot get users, you are not verified")
        }else{
            const user = await User.find({_id:{$ne: userId}})
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {userUpdate, deleteUser, getUsers}