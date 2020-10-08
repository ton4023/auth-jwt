const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{ 
        type: String,
        required: true,
    },
    post:{ 
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
    date:{ 
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Product',productSchema)
