const express = require('express');
const route = express.Router()
const middleware = require('../../auth/middleware')

// import controller
const productsController = require('../controller/products')



route
    .get('/products', productsController.getProducts)
    .get('/products/paginate', productsController.getpaginateProducts)
    .post('/products', productsController.addProduct)
    .delete('/products', productsController.deleteProduct)
    .patch('/products/:id', productsController.updateProduct)
    .post('/products/reduce', productsController.reduceProducts)
    .get('/products/:id', productsController.getProducts)
    .get('/countproducts', productsController.getCountProduct)//???
    .get('/recentorder', productsController.getRecentOrder) // grafik
    .get('/countorders', productsController.getAllOrder) // card
    .get('/grOrder', productsController.grOrder) // table
module.exports = route


