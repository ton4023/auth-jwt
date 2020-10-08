const router = require('express').Router()
const Token = require('../model/Token')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

//Get Data
router.get('/', async (req, res) => {
      const token = req.header('auth-token')
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      if (token) {
            const result = await Token.findOne({ user: decoded})
            res.json(result)
      }
})

module.exports = router