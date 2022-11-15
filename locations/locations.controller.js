// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})

router.get('/locations/:id', async (req, res) => {
	//return res.status(200).send({params: req.params.id})
	return res.status(200).send({location: await locationsService.findOne(req.params.id)})
})

router.post('/locations', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({locations: await locationsService.Add(req.body)})
})

router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: locationsService.Del(req.params.id)})
})

router.patch('/locations/:id', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({locations: locationsService.Update(req.params.id,req.body)})
})

module.exports = router
