const conn = require('../configs/db') // config db
const fs = require('fs') // file system
module.exports = {
    getProducts: (data) => {
        const search = data.search
        const sortBy = data.sortBy
        return new Promise((resolve, reject) => {
            if (search != null) {
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id WHERE name LIKE "%' + search + '%"', (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            } else if (sortBy != null) {
                console.log(sortBy)
                conn.query('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id ORDER BY ' + sortBy + '', (err, result) => {
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
        console.log(data)
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM products WHERE id=?', data, (err, result) => {
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
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products WHERE id=?", data.id, (err, result) => {
                let [img] = result
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
        var reduce = data.quantity
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products WHERE id=?", [data.id], (err, result) => {
                if (result.length > 0) {
                    const [data] = result
                    const count = data.quantity - reduce
                    if (count >= 0) {
                        conn.query("UPDATE products SET quantity=? WHERE id=?", [count, data.id])
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
        })
    }
}