const router = require('express').Router()
const Token = require('../model/Token')

const verify = require('./verify')
const dotenv = require('dotenv').config()

//Get Data
router.get('/:key', verify, async (req, res) => {
    
         const user = await Token.findOne({ user: req.key })
         res.send(json(user))
   })

module.exports = router