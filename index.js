const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

app.use(cors())

//import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

//Connect to DB
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_CONNECT,option,()=>console.log('Connceted to db'))

//Middlewares
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

app.listen(4000,()=>console.log("Server is running"))