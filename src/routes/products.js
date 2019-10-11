const express = require('express');
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
//import controller
const productsController = require('../controller/products')



route
    .get('/products', cors(), productsController.getProducts)
    .get('/products/paginate', cors(), productsController.getpaginateProducts)
    .post('/products', cors(), productsController.addProduct)
    .delete('/products', cors(), productsController.deleteProduct)
    .patch('/products/:id', productsController.updateProduct)
    .post('/products/reduce', cors(), productsController.reduceProducts)
    .get('/products/:id', cors(), productsController.getProducts)
    .get('/countproducts', cors(), productsController.getCountProduct)//???
    .get('/recentorder', cors(), productsController.getRecentOrder)
    .get('/countorders', cors(), productsController.getAllOrder)
module.exports = route


