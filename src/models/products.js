const conn = require('../configs/db') // config db
const fs = require('fs') // file system
module.exports = {
    getProducts: (data) => {
        const search = data.search
        const sortBy = data.sortBy
        const orderBy = data.orderBy
        const idparams = data.id
        return new Promise((resolve, reject) => {
            if (search != null) {
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id WHERE name LIKE "%' + search + '%"', (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            } else if (sortBy != null || sortBy === 'name') {
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id ORDER BY ' + sortBy + ' ' + orderBy, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            } else if (idparams != null) {
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id WHERE a.id=?', idparams, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            } else {
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id', (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            }
        })
    },
    addProduct: (data) => {
        // console.log(data)
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products WHERE name=?", data.name, (err, result) => {
                if (result.length > 0) {
                    conn.query("UPDATE products SET quantity = ? where id=?", [result[0].quantity + 1, result[0].id], (err, tresult) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })
                } else {
                    conn.query("SELECT * FROM category", (err, result) => {
                        const category = [result[0].id, result[1].id, result[2].id, result[3].id]
                        if (data.id_category == category[0] || data.id_category == category[1] || data.id_category == category[2] || data.id_category == category[3]) {
                            console.log('categori ditemukan');
                            conn.query("INSERT INTO products SET ?", data, (err, result) => {
                                if (!err) {
                                    resolve(result)
                                } else {
                                    reject(err)
                                }
                            })
                        } else {
                            console.log('category tidak ada');
                            reject(err)
                        }
                    })
                }
            })
        })
    },
    deleteProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM products WHERE id=?', data, (err, result) => {
                console.log(result);
                conn.query('DELETE FROM products WHERE id =?', data, (err) => {
                    fs.unlink(result[0].image, (err) => {
                        if (err) {
                            console.log(err);
                        } else console.log('image deleted');
                    })
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    },
    updateProduct: (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products WHERE id=?", data.id, (err, result) => {
                // let [img] = result
                if (!err) {
                    conn.query('UPDATE products SET ? WHERE id=?', [data, data.id], (err, result) => {
                        fs.unlink(img.image, (err) => {
                            if (err) {
                                console.log(err);
                            } console.log('image updated');
                        })
                        if (!err) {
                            resolve(result)
                        } else {
                            reject(err)
                        }
                    })
                }
            })
        })
    },
    getpaginateProducts: (name, page, limit, sortBy) => {
        // console.log({ name, page, limit, sortBy });
        // console.log('SELECT * FROM products where name like "%' + name + '%" ORDER BY ' + sortBy + ' asc limit ' + page + ',' + limit);
        return new Promise((resolve, reject) => {
            conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id where name like "%' + name + '%" ORDER BY ' + sortBy + ' asc limit ' + page + ',' + limit, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    reduceProducts: (data) => {
        // console.log(data);
        return new Promise((resolve, reject) => {
            let countData = data.id.length
            for (let id = 0; id < countData; id++) {
                let checkOut = { id: data.id[id], quantity: data.quantity[id] }
                conn.query("SELECT * FROM products WHERE id=?", [checkOut.id], (err, result) => {
                    if (result.length > 0) {
                        let reduce = result[0].quantity - checkOut.quantity
                        if (reduce >= 0) {
                            conn.query("UPDATE products SET quantity=? WHERE id=?", [reduce, checkOut.id])
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(err)
                            }
                        } else {
                            result = "Out of data"
                            resolve(result)
                        }
                    } else {
                        result = "Your id is worng"
                        reject(result)
                    }
                })
            }
        })
    },
    getTotalAllData: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT COUNT(id)', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}