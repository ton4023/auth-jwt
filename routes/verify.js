const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.params.key

    if (!token) {
        return res.status(401).send('Not Token')
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_API) //_id
        req.key = decoded
        next()
    } catch (error) {
        res.status(400).send(error)
    }

}