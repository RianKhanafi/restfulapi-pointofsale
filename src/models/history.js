const conn = require('../configs/db')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
module.exports = {
    // grafik
    getRevenue: (data) => {
        // console.log("get Order" + data)
        const urlget = 'SELECT *,SUM(amount) as amountcount,DAYOFWEEK(date) as today, DAYNAME(date) as dayname,MONTHNAME(date) as monthname,YEAR(date) as year, EXTRACT(MONTH FROM date) as month, EXTRACT(DAY FROM date) as week, EXTRACT(YEAR FROM date) AS year FROM history GROUP BY ' + data;
        return new Promise((resolve, reject) => {
            conn.query(urlget, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    // card
    getIncomeGrowth: () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT (SELECT sum(amount) FROM history WHERE DATE(date) = DATE(NOW() - INTERVAL 1 DAY)) AS yesterday, (SELECT sum(amount) FROM history WHERE DATE(date) = DATE(NOW() - INTERVAL 0 DAY)) AS daynow, (SELECT sum(amount) FROM history WHERE YEAR(date) = YEAR(CURDATE()) -1) AS yearlast , (SELECT sum(amount) FROM history WHERE YEAR(date) = YEAR(CURDATE())) AS yearnow, (SELECT COUNT(idRecent) FROM history WHERE WEEK(date) = WEEK(CURDATE())) AS weeknow, (SELECT COUNT(idRecent) FROM history WHERE DAY(date) = DAY(CURDATE())) AS dayordernnow, (SELECT COUNT(idRecent) FROM history WHERE WEEK(date) = WEEK(CURDATE()) -1 ) AS lastweek", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },


    // menampilkan di Recent Order
    getRecentOrder: (value) => {

        let to = 10
        if (value === 'day') {
            to = 10
        } else if (value === 'month') {
            to = 7
        } else if (value === 'year') {
            to = 4
        }
        return new Promise((resolve, reject) => {
            conn.query('SELECT *, SUBSTR(DATE,1,' + to + ') AS dateday, SUBSTR(CURDATE(),1,' + to + ') AS datenow FROM history HAVING dateday = datenow ORDER BY date desc limit 10', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}