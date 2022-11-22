const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const locationController = require('./locations/locations.controller')
const userController = require('./Users/users.controller')
const Console = require('console');
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(userController)
app.use(locationController)

app.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

app.listen(port, async () => {
	await mongoose.connect(process.env.MONGO_URI)
	Console.log("Connected")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
