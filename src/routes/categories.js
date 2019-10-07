const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
const categoriesController = require('../controller/categories')

route
    .get('/categories', cors(), categoriesController.getCategories)
    .post('/categories', cors(), middleware.checkToken, categoriesController.addCategories)
    .delete('/categories/:id', cors(), middleware.checkToken, categoriesController.deleteCategories)
    .put('/categories', cors(), middleware.checkToken, categoriesController.updateCategories)
    .get('/categories/:category', cors(), middleware.checkToken, categoriesController.getCategoriesbyname)

module.exports = route