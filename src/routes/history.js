const express = require('express')
const route = express.Router()
const middleware = require('../../auth/middleware')

const historyController = require('../controller/history')

route
    // .get('/countproducts', productsController.getCountProduct)//???
    // .get('/revenue', historyController.getRevenue) // grafik
    // .get('/growthincome', historyController.getIncomeGrowth) // card
    .get('/recentorder', historyController.getRecentOrder) // table
module.exports = route