const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = (req, res, next) => {
    const token = req.params.key || req.body.key
  
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_API) //_id
        req.key = decoded
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

