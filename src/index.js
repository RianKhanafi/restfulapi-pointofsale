const express = require('express')
const Route = express.Router()

// import routes
const products = require('./routes/products')
const categories = require('./routes/categories')
const registration = require('./routes/registrasi')

Route.use('/api/v.0.1', products)
Route.use('/api/v.0.1', categories)
Route.use('/api/v.0.1', registration)
module.exports = Route