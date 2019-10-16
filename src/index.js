const express = require('express')
const Route = express.Router()

// import routes
const products = require('./routes/products')
const categories = require('./routes/categories')
const registration = require('./routes/registrasi')
const history = require('./routes/history')

Route.use('/api/', products)
Route.use('/api/', categories)
Route.use('/api/', registration)
Route.use('/api/', history)
module.exports = Route