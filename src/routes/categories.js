const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
const categoriesController = require('../controller/categories')

route
    .get('/categories', middleware.checkToken, categoriesController.getCategories)
    .post('/categories', middleware.checkToken, categoriesController.addCategories)
    .delete('/categories/:id', middleware.checkToken, categoriesController.deleteCategories)
    .put('/categories', middleware.checkToken, categoriesController.updateCategories)
    .get('/categories/:category', middleware.checkToken, categoriesController.getCategoriesbyname)

module.exports = route