// import all dependencies requires
// import es5
const express = require('express')
const bodyParser = require('body-parser') // for parsing req.body
// const multer = require('multer') // file
const morgan = require('morgan')
const fileUpload = require('express-fileupload')

require('dotenv').config()



// const path = require('path') // file

// es 6 
// inport express from 'express'

//import route
const routerNav = require('./src/index')

// use express
const app = express()
// use body parser form json
app.use(bodyParser.json())
// use body parser form form url-encoded
app.use(bodyParser.urlencoded({ extended: true }))

// define PORT
const port = process.env.SERVER_PORT || 5000

// listen start server with es5 function
app.listen(port, function () {
    console.log('Server has running port: ' + port);
});


app.use(morgan('dev'))
app.use(fileUpload())
app.use('/', routerNav)

// add not found route must on bottom
app.get('*', (req, res) => {
    res.send('Sorry, 404 not found')
})