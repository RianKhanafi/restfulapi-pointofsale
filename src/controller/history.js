//import model
const historyModel = require('../models/history')
const fileUpload = require('express-fileupload')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const db = require('../configs/db')

module.exports = {
    // grafik
    getRevenue: (req, res) => {
        let orderBy = req.query.order
        // console.log(orderBy)
        orderBy = typeof orderBy !== 'undefined' ? orderBy : "week"
        historyModel.getRevenue(orderBy)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'success getting all data',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    message: 'error getting data',
                })
            })
    },
    getIncomeGrowth: (req, res) => {
        historyModel.getIncomeGrowth()
            .then((result) => {
                res.json({
                    status: 200,
                    message: 'success getting count order',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    message: 'error getting data count order',
                })
            })
    },
    getRecentOrder: (req, res) => {
        console.log('aaaaa ');
        historyModel.getRecentOrder(req.query.order)
            .then((result) => {
                res.json({
                    status: 200,
                    message: 'success getting count order',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    message: 'error getting data count order',
                })
            })
    }
}