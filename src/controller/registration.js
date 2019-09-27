const registrationModel = require('../models/registration')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
const conn = require('../configs/db')

module.exports = {
    addRegistration: (req, res) => {
        let { name, email, password, id_level } = req.body
        let id = uuidv4()
        let data = { id, name, email, password, id_level }
        registrationModel.addRegistration(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'the ' + data.name + ' registered',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    message: 'the user not registered'
                })
            })
    },
    getRegistrant: (req, res) => {
        registrationModel.getRegistrant()
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success getting data',
                    data: resultQuery
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    message: 'error getting data'
                })
            })
    },
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        // For the given username fetch user from DB
        conn.query('SELECT * FROM user WHERE email=? and password=?', [email, password], (err, result) => {
            let [hsl] = result
            let mockedUsername = hsl.email
            let mockedPassword = hsl.password
            if (email && password) {
                if (email === mockedUsername && password === mockedPassword) {
                    let token = jwt.sign({ email: email }, config.secret, { expiresIn: '24h' })
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    })
                } else {
                    res.send(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                    })
                }
            } else {
                res.send(400).json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                })

            }
        })
    }

}
