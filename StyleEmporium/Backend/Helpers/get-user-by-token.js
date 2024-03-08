const jwt = require('jsonwebtoken')

const User = require('../Model/User')

//get user com jwt token

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' })
    }

    const decoded = jwt.verify(token, 'nossosecret')

    const userId = decoded.id

    const user = await User.findOne({ id: userId })

    return user
}

module.exports = getUserByToken