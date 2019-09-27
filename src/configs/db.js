const mysql = require('mysql')
const config = require('./configs')
const connection = mysql.createConnection(config.database.mysql)

connection.connect((err) => {
    if (err) console.log(`Error ${err}`) // literal
    console.log('DB Connected');


})
module.exports = connection