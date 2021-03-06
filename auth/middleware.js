const config = require('./config')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let checkToken = (req, res, next) => {
    let token =
        req.headers['x-access-token'] ||
        req.headers['authorization'] ||
        req.body.token ||
        req.query.token ||
        req.cookies.token

    // express headers
    if (token) {
        if (token.startsWith('Bearer ')) {
            // remove bearing from string
            token = token.slice(7, token.length)
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: 401,
                    message: 'Auth token is not supplied'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

module.exports = {
    checkToken: checkToken
}