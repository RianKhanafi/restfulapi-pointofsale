const express = require('express');
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
//import controller
const productsController = require('../controller/products')

// cors 
// var whitelist = ['http://localhost:3000/home', 'http://localhost:3000/home#']
// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     if (whitelist.indexOf(req.header('Access-Control-Allow-Origin'))) {
//         corsOptions = { origin: true }
//     } else {
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }

route
    .get('/products', cors(), productsController.getProducts)
    .get('/products/paginate', cors(), productsController.getpaginateProducts)
    .post('/products', cors(), productsController.addProduct)
    .delete('/products', cors(), productsController.deleteProduct)
    .put('/products/:id', productsController.updateProduct)
    .post('/products/reduce', cors(), productsController.reduceProducts)
    .get('/products/:id', cors(), productsController.getProducts)

module.exports = route


