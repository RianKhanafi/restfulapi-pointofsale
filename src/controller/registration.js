const registrationModel = require('../models/registration')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
const conn = require('../configs/db')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const saltRounds = 10;

module.exports = {
    addRegistration: (req, res) => {
        let { name, email, password } = req.body
        let id = uuidv4()
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        password = hash
        let id_level = 1
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
                console.log(err.message)
                res.status(400).json({
                    status: 400,
                    message: 'error getting data'
                })
            })
    },
    login: (req, res) => {
        let email = req.body.email
        // console.log(email);
        let password = req.body.password
        // For the given username fetch u   ser from DB
        conn.query('SELECT * FROM user WHERE email=?', email, (err, result) => {
            // if (result[0] !== undefined) {
            //     console.log('udfined');
            //     res.end();
            // }
            let checkPass = bcrypt.compareSync(password, result[0].password)
            if (checkPass) {
                let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '24h' })
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                })
                // res.cookie('token', token, { httpOnly: true }).sendStatus(200)
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                })
            }
        })
    }

}
