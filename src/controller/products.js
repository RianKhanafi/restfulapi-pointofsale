//import model
const productModel = require('../models/products')
const fileUpload = require('express-fileupload')
const uuidv4 = require('uuid/v4')
const fs = require('fs')


module.exports = {

    getProducts: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        const search = req.query.search
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy
        const id = req.params.id
        const data = { search, sortBy, orderBy, id }
        productModel.getProducts(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success getting all data',
                    amounth: resultQuery.length,
                    data: resultQuery
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: 'error getting all data from database'
                })
            })
    },
    addProduct: (req, res) => {
        const { name, description, id_category, price, quantity, updated } = req.body
        // set upload image
        let image = req.files.image
        if (image.mimetype.split('/')[1] === "jpeg" || image.mimetype.split('/')[1] === "png") {
            let imgName = uuidv4() + `.${req.files.image.mimetype.split("/")[1]}`
            image.mv('images/' + imgName, function (err) {
                if (err)
                    return res.status(500).send(err)
            })
            image = imgName
            //uuid
            let id = uuidv4();
            const data = { id, name, description, image, id_category, price, quantity, updated }
            console.log(data)
            productModel.addProduct(data)
                .then(resultQuer => {
                    res.json({
                        status: 200,
                        message: 'success adding new data',
                        data
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({
                        status: 400,
                        mesage: 'error adding new data'
                    })
                })
        } else {
            res.send('Other than jpeg or png not permitted')
        }
    },
    deleteProduct: (req, res) => {
        const data = req.query.id
        productModel.deleteProduct(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    mesage: "success delete data",
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    status: 400,
                    message: 'error deleting data'
                })
            })
    },
    getProductsbyname: (req, res) => {
        const { name } = req.params
        const data = name
        console.log(data);
        productModel.getProductsbyname(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success getting all data',
                    amounth: resultQuery.length,
                    data: resultQuery
                })
            })
            .catch(err => {
                console.log(err.message)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all data from database'
                })
            })
    },
    updateProduct: (req, res) => {
        // rea.setheader('Access-Control-Allow-Origin', '*')
        const { name, description, image, id_category, price, added } = req.body
        const id = req.params.id
        // let imgName = uuidv4() + `.${req.files.image.mimetype.split('/')[1]}`
        // image.mv('images/' + imgName, (err) => {
        //     if (err)
        //         return res.status(200).send(err)
        // })
        // image = 'images/' + imgName
        // let date = new Date();
        var updated = new Date();
        const data = { name, description, image, id_category, price, updated, id, }
        console.log(data);
        productModel.updateProduct(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success updating data',
                    data
                })
            })
            .catch(err => {
                console.log(err.message);
                console.log(data);
                res.json({
                    status: 400,
                    message: 'error updateing data'
                })
            })
    },
    getsortProducts: (req, res) => {
        const { sort } = req.params
        const data = sort
        productModel.getsortProducts(data)
            .then(resultQuer => {
                res.json({
                    status: 200,
                    message: 'sort products success',
                    amounth: resultQuery.length,
                    data: resultQuer
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    status: 400,
                    message: 'error sort data'
                })
            })
    },
    getpaginateProducts: (req, res) => {
        var { name, page, limit, sortBy } = req.query
        name = typeof name !== 'undefined' ? name : ""
        page = typeof page !== 'undefined' ? page : 0
        limit = typeof limit !== 'undefined' ? limit : 5
        sortBy = typeof sortBy !== 'undefined' ? sortBy : 'id'
        productModel.getpaginateProducts(name, page, limit, sortBy)
            // let totalProduct = await productModel.getTotalAllData()
            // const total_page = Macth.ceil(totalProduct[0].getTotalAllData / limit)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success getting data',
                    amounth: resultQuery.length,
                    data: resultQuery
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    status: 400,
                    message: 'error getting data'
                })
            })
    },
    reduceProducts: (req, res) => {
        const { quantity, id } = req.body
        const data = { id, quantity }
        // console.log(data);
        // let countData = data.id.length
        // console.log(countData);
        // for (let id = 0; id < countData; id++) {
        //     const checkOut = [data.id[id], data.quantity[id]]
        productModel.reduceProducts(data)
        // .then(resultQuery => {
        //     res.json({
        //         status: '200',
        //         message: 'success reduce product',
        //         data: resultQuery
        //     })
        // })
        // .catch(err => {
        //     res.status(400).json({
        //         status: '400',
        //         message: 'error reduce product'
        //     })
        // })
        // }
    }
}