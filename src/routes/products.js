const express = require('express');
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
//import controller
const productsController = require('../controller/products')



route
    .get('/products', cors(), productsController.getProducts)
    .get('/products/paginate', cors(), middleware.checkToken, productsController.getpaginateProducts)
    .post('/products', cors(), middleware.checkToken, productsController.addProduct)
    .delete('/products', cors(), productsController.deleteProduct)
    .patch('/products/:id', productsController.updateProduct)
    .post('/products/reduce', cors(), productsController.reduceProducts)
    .get('/products/:id', cors(), productsController.getProducts)

module.exports = route


