const router = require('express').Router()
const UserService = require('./users.service')
const passport = require("passport")
require('../passport_strategies/localStrategy')
require('../passport_strategies/JWTstrategy')
const jwt = require('jsonwebtoken');
const roleMiddleware = require('../authorization/authorization.middleware')
require('dotenv').config()

router.post('/users/register', async (req, res) => {
    try{
        return res.status(200).send({users: await UserService.register(req.body)})
    }
    catch (e) {
        return res.status(400).send(e)
    }

})

router.post('/users/login',passport.authenticate('local', { session: false},null), async (req, res) => {
    const user = await UserService.auth(req.user);
    res.status(200).send({token : user.token})

})



router.get('/users/me', passport.authenticate('jwt', { session: false}) ,async (req, res) => {
    return res.status(200).send(await UserService.findId(req.user._id))
})



router.put('/users/me',passport.authenticate('jwt', { session: false}) , async (req, res) => {
    if(req.body.role!=null){
        return res.status(403).send("Forbidden")
    }
    try{
        return res.status(200).send(await UserService.updateMe(req.user._id, req.body))
    }catch(e){
        if(e.message==="Not found"){
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad request")
    }
})
router.delete('/users/me',passport.authenticate('jwt', { session: false}) , roleMiddleware.canAccess(["admin"]),  async (req, res) => {
    try{
        const user = await UserService.deleteMe(req.user._id)
        return res.status(200).send(user)
    }catch(e){
        if(e.message==="Not found"){
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad request")
    }
})
router.get('/users', async (req, res) => {
    return res.status(200).send({users: await UserService.findAll()})
})

module.exports = router