const config = require('./config')
const jwt = require('jsonwebtoken')

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // express headers
    if (token) {
        if (token.startsWith('Bearer ')) {
            // remove bearing from string
            token = token.slice(7, token.length)
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
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