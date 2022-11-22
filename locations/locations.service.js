// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find({}).limit(10).lean()
}

function findOne ( id){
	return Location.findById(id)
}

function Add(content) {
	const Local = new Location(content)
	return Local.save()
}

async function Del(item) {
	console.log(item)
	const result = await Location.deleteOne({_id: item})
	return result.deletedCount
}

async function Update(id, content) {
	const result = await Location.updateOne({_id: id}, content)
	return result
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.Add = Add
module.exports.Del = Del
module.exports.Update = Update
