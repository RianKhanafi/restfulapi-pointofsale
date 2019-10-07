const express = require('express');
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
//import controller
const productsController = require('../controller/products')



route
    .get('/products', cors(), productsController.getProducts)
    .get('/products/paginate', cors(), productsController.getpaginateProducts)
    .post('/products', cors(), middleware.checkToken, productsController.addProduct)
    .delete('/products', cors(), middleware.checkToken, productsController.deleteProduct)
    .patch('/products/:id', middleware.checkToken, productsController.updateProduct)
    .post('/products/reduce', cors(), middleware.checkToken, productsController.reduceProducts)
    .get('/products/:id', cors(), productsController.getProducts)

module.exports = route


