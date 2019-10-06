const conn = require('../configs/db')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
module.exports = {
    addRegistration: (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM user WHERE email=?', data.email, (err, result) => {
                if (result.length < 1) {
                    conn.query('INSERT INTO user SET ?', data, (err, result) => {
                        if (!err) {
                            resolve(result)
                        } else {
                            reject(err)
                        }
                    })
                } else {
                    err = "Email is alredy registered"
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
