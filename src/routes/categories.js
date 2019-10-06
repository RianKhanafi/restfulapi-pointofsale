const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')
const categoriesController = require('../controller/categories')


// cors 
var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(res.header('Access-Control-Allow-Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}


route
    .get('/categories', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.getCategories)
    .post('/categories', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.addCategories)
    .delete('/categories/:id', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.deleteCategories)
    .put('/categories', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.updateCategories)
    .get('/categories/:category', cors(corsOptionsDelegate), middleware.checkToken, categoriesController.getCategoriesbyname)

module.exports = route