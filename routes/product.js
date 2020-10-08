const router = require('express').Router()
const Product = require('../model/Product')
const Token = require('../model/Token')
const verify = require('./verify')


//Get Product
router.get('/:key', verify, async (req, res) => {
      const token = await Token.findOne({ user: req.key })
      if (token) {
            const result = await User.find({})
            res.json(result)
      }
})

//Create Product
router.post('/create', verify, async (req, res) => {
      const token = await Token.findOne({ user: req.key })
      if (token) {
            try {
                  const product = new Product({
                        name: req.body.name,
                        description: req.body.description,
                        post: req.body.post,
                        img: req.body.img
                  })
                  const productSave = await product.save()
                  res.json(productSave)
            } catch (error) {
                  res.json({ message: error })
            }
      }
})

//Delete Product
router.delete('/:key/:prodID', verify, async (req, res) => {
      const token = await Token.findOne({ user: req.key })
      if (token) {
            try {
                  const removeProduct = await Product.remove({ _id: req.params.prodID })
                  res.json(removeProduct)
            } catch (error) {
                  res.json({ message: error })
            }
      }
})

//Edit Product
router.patch('/:key/:prodID', verify, async (req, res) => {
      const token = await Token.findOne({ user: req.key })
      if (token) { 
            try {
                  const updateProduct = await Product.updateOne(
                        
                        { _id: req.params.prodID },
                        {
                              $set: {
                                    name: req.body.name,
                                    description: req.body.description,
                                    post: req.body.post,
                                    img: req.body.img
                              }
                        }
                  )
                  res.json(updateProduct)
            }
            catch (error) {
                  res.json({ message: error })
            }
      }
})

module.exports = router