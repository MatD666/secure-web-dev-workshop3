const User = require('./users.model')

async function register(body) {
    const name = await User.find({username: body.username})
    console.log(name)
    if (name!=[]) {
        const user = new User(body)
        return await user.save()
    }
    return "fail"
}


function findAll () {
    return User.find({}).limit(10)
}

module.exports.register = register

module.exports.findAll = findAll