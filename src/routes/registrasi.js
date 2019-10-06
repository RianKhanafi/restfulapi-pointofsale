const express = require('express')
const route = express.Router()
const cors = require('cors')
const middleware = require('../../auth/middleware')

// cors 
// var whitelist = ['http://localhost:5000']
// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     if (whitelist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true }
//     } else {
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }
const registrationController = require('../controller/registration')

route
    .post('/registration', cors(), registrationController.addRegistration)
    .get('/registration', cors(), registrationController.getRegistrant)
    .post('/registration/login', cors(), registrationController.login)
module.exports = route