const router = require('express').Router()
const UserService = require('./users.service')

router.post('/users/register', async (req, res) => {
    return res.status(200).send({users: await UserService.register(req.body)})
})
/*
router.post('/users/login', async (req, res) => {
    return res.status(200).send({locations: await })
})
router.get('/users/me', async (req, res) => {
    return res.status(200).send({locations: await })
})
router.patch('/users/me', async (req, res) => {
    return res.status(200).send({locations: await })
})
router.delete('/users/me', async (req, res) => {
    return res.status(200).send({locations: await })
})*/
router.get('/users', async (req, res) => {
    return res.status(200).send({users: await UserService.findAll()})
})

module.exports = router