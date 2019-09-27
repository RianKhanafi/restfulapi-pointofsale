const conn = require('../configs/db')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
module.exports = {
    addRegistration: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getRegistrant: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM user', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}
