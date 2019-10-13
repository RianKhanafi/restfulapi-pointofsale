const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')

const registrationController = require('../controller/registration')

route
    .post('/registration', registrationController.addRegistration)
    .get('/registration', registrationController.getRegistrant)
    .post('/registration/login', registrationController.login)
module.exports = route