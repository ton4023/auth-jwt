const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Token',tokenSchema)