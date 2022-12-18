const User = require('./users.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function findOne(username){
    return User.findOne({username:username})
}
async function findId(id){
    return User.findOne({_id :id})
}

async function register(body) {
    const name = await User.find({username: body.username})
    console.log(name)
    if (name) {
        throw new Error("User allready in base")
    }
    else{
        try{
            const salt = await bcrypt.genSalt()
            const user = new User({username : body.username, password : await bcrypt.hash(body.password, salt), role : "user"})
            return await user.save()
        }
        catch (e) {
            throw new Error("Wrong information")
        }
    }
}

async function auth(user){
    user.token = jwt.sign(
        {_id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return user;
}
async function updateMe(id,update) {
    const user = await User.updateOne({ _id: id }, update)
    if(!user)
        throw new Error("Not found")
    return user
}
async function deleteMe(id) {
    const user = await User.findOneAndDelete( {_id : id})
    if(!user)
        throw new Error("Not found")
    return user
}

async function findAll () {
    return User.find().select({"password": 0})
}

module.exports.register = register
module.exports.findOne = findOne
module.exports.findId = findId
module.exports.auth = auth
module.exports.updateMe = updateMe
module.exports.deleteMe = deleteMe
module.exports.findAll = findAll