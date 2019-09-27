const conn = require('../configs/db')

module.exports = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM category", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    addCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO category SET category = ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deleteCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query("DELETE FROM category WHERE id = ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query("UPDATE category SET category= ? WHERE id=?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getCategoriesbyname: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM category WHERE category like "%' + data + '%"', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            });
        })
    }
}