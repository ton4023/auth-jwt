const router = require('express').Router()
const User = require('../model/User')
const verify = require('./verifyToken')

router.get('/', verify, async (req, res) => {
   const result = await User.find({})
   res.json(result)
})

module.exports = router