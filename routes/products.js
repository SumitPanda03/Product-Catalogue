const router = require('express').Router();
const { route } = require('.');
const ErrorHandler = require('../errors/ErrorHandler');
let products = require('../productData')
const apiKeyMiddleWare = require('../middlewares/apiKey')

router.get('/products', (req,res) => {
    res.render('products', {
        title: 'Products Page'
    })
})

router.get('/api/products', (req,res) =>{
    res.json(products)
})

router.post('/api/products',apiKeyMiddleWare, (req,res,next) =>{
    const {name, price} = req.body

    if(!name || !price){
        // return res.status(422).json({error: "All fields are required"})
        // throw new Error("All fields are required")
        next(ErrorHandler.validationError('Name and Price required'))
    }

    const product = {
        name: name,
        price: price,
        id: new Date().getTime().toString()
    }

    products.push(product)
    res.json(product)
})

router.delete('/api/products/:productid', (req,res) => {
    products = products.filter((product) => req.params.productid !== product.id)
    res.json({status: "OK"})
})


module.exports = router