const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')

const registrationController = require('../controller/registration')

route
    .post('/registration', cors(), registrationController.addRegistration)
    .get('/registration', cors(), registrationController.getRegistrant)
    .post('/registration/login', cors(), registrationController.login)
module.exports = route