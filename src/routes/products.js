const express = require('express');
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
//import controller
const productsController = require('../controller/products')

// cors 
var whitelist = ['http://localhost:5000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

route
    .get('/products', cors(corsOptionsDelegate), middleware.checkToken, productsController.getProducts)
    .get('/products/paginate', cors(corsOptionsDelegate), middleware.checkToken, productsController.getpaginateProducts)
    .post('/products', cors(corsOptionsDelegate), middleware.checkToken, productsController.addProduct)
    .delete('/products/:id', cors(corsOptionsDelegate), middleware.checkToken, productsController.deleteProduct)
    .put('/products/', cors(corsOptionsDelegate), middleware.checkToken, productsController.updateProduct)
    .post('/products/reduce', cors(corsOptionsDelegate), middleware.checkToken, productsController.reduceProducts)


module.exports = route


