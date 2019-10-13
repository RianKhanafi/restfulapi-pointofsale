const express = require('express')
const Route = express.Router()

// import routes
const products = require('./routes/products')
const categories = require('./routes/categories')
const registration = require('./routes/registrasi')

Route.use('/api/', products)
Route.use('/api/', categories)
Route.use('/api/', registration)
module.exports = Route