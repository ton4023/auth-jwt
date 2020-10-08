const router = require('express').Router()
const User = require('../model/User')
const Token = require('../model/Token')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { json } = require('express')

//Create
router.post('/register', [
    body('name').isLength({ min: 6, max: 255 }),
    body('email').isEmail().isLength({ min: 6, max: 255 }),
    body('password').isLength({ min: 6, max: 255 }),
],
    async (req, res) => {
        //Valdidate data
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Check email 
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) {
            return res.status(400).send('Email already exists')
        }

        //Hash password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //Create user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })

        try {
            const userSave = await user.save()
            if (userSave) {
                //Create Key for API  
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_API)
                const keys = new Token({ key: token, user: user._id })
                const tokenSave = await keys.save()
                res.send(json(tokenSave))
            }
        } catch (error) {
            res.status(400).send(error)
        }
    })

//Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Email is not found')
    }
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.status(400).send('Invalid Password ')
    }

    //Create token
    const token = jwt.sign({ _id:user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router