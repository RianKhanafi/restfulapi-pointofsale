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
        console.log(data)
        // console.lo   g(data);
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products WHERE id=?", data.id, (err, result) => {
                let [img] = result
                if (!err) {
                    conn.query('UPDATE products SET ? WHERE id=?', [data, data.id], (err, result) => {
                        // if (img.image !== null) {
                        //     fs.unlink(img.image, (err) => {
                        //         if (err) {
                        //             console.log(err);
                        //         } console.log('image updated');
                        //     })
                        if (!err) {
                            resolve(result)
                        } else {
                            reject(err)
                        }
                        // }
                    })
                }
            })
        })
    },
    getpaginateProducts: (name, page, limit, sortBy) => {
        // console.log({ name, page, limit, sortBy });
        // console.log('SELECT a.*, b.category FROM products a INNER JOIN category b ON a.id_category = b.id where name like "%' + name + '%" ORDER BY ' + sortBy + ' asc limit ' + page + ',' + limit);
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
        // console.log(data)
        let orders = data.ordername
        if (orders.length > 1) {
            orders = data.ordername.join()
            // console.log(orders);
        }
        // console.log(data.date)
        return new Promise((resolve, reject) => {
            // for (let order = 0; order < data.length; order++) {
            //     let orders = data.order
            //     console.log(orders)
            // }
            let countData = data.id.length
            for (let id = 0; id < countData; id++) {
                let checkOut = { id: data.id[id], quantity: data.quantity[id] }
                conn.query("SELECT * FROM products WHERE id=?", [checkOut.id], (err, result) => {
                    if (result.length > 0) {
                        let reduce = result[0].quantity - checkOut.quantity
                        if (reduce >= 0) {
                            conn.query("UPDATE products SET quantity=? WHERE id=?", [reduce, checkOut.id])
                            if (!err) {
                                conn.query("INSERT INTO history (idRecent,buyer,orders,amount) VALUES('" + data.idRecent + "', '" + data.buyer + "', '" + orders + "', '" + data.amount + "')", (err, result) => {
                                    if (!err) {
                                        resolve(result)
                                    } else {
                                        reject(err)
                                    }
                                })
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
    getCountProduct: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT count(id) from products', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getRecentOrde: (data) => {
        // if (data === undefined) data = 'week'
        console.log(data)
        // SELECT *,SUM(amount),DAYOFWEEK(date), DAYNAME(date), EXTRACT(WEEK FROM date) as week, EXTRACT(YEAR FROM date) AS year FROM history GROUP BY year
        const urlget = 'SELECT *,SUM(amount) as amountcount,DAYOFWEEK(date) as today, DAYNAME(date) as dayname,MONTHNAME(date) as monthname,YEAR(date) as year, EXTRACT(MONTH FROM date) as month, EXTRACT(WEEK FROM date) as week, EXTRACT(YEAR FROM date) AS year FROM history GROUP BY ' + data;
        return new Promise((resolve, reject) => {
            // conn.query(urlcountorder, (err, resultcountorder) => {
            conn.query(urlget, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
            // })
        })
    },
    getAllOrder: () => {
        let date = new Date()
        console.log(date.getFullYear());
        // console.log('SELECT *, EXTRACT(day FROM date) as day, sum(amount) as countAmount FROM history  WHERE EXTRACT(day FROM date) = ' + date.getDate() + ' GROUP BY day')
        return new Promise((resolve, reject) => {
            conn.query('SELECT EXTRACT(year FROM date) as year, sum(amount) as countAmount FROM history  WHERE EXTRACT(year FROM date) = ' + date.getFullYear() + ' GROUP BY year', (err, resYearIncome) => {
                conn.query('SELECT count(idRecent) as idRecent FROM history', (err, resCount) => {
                    conn.query('SELECT EXTRACT(day FROM date) as day, sum(amount) as countAmount FROM history  WHERE EXTRACT(day FROM date) = ' + date.getDate() + ' GROUP BY day', (err, rcAmount) => {
                        if (!err) {
                            resolve({ rcAmount, resCount, resYearIncome })
                        } else {
                            reject(err)
                        }
                    })
                })
            })
        })
    }
}