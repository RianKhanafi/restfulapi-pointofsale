const categoriesModel = require('../models/categories')
// const redis = require('redis')
// const client = redis.createClient() 
const categoryRedKey = "user: category"

module.exports = {
    getCategories: (req, res) => {
        // return client.get(categoryRedKey, (err, categories) => {
        //     if (categories) {
        //         const result = JSON.parse(categories);
        //         return res.json({
        //             from: 'cache',
        //             status: 200,
        //             length: result.length,
        //             data: result,
        //             message: "Show data success"
        //         })
        //     } else {
        categoriesModel.getCategories()
            .then(QueryResult => {
                client.setex(categoryRedKey, 3600, JSON.stringify(QueryResult));
                res.json({
                    status: 200,
                    message: 'success get data categories',
                    length: QueryResult.length,
                    data: QueryResult
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    error: 400,
                    message: 'Error getting data categories'
                })
            })
        // }
        // })
    },
    addCategories: (req, res) => {
        const { category } = req.body
        const data = category
        console.log(data);
        categoriesModel.addCategories(data)
            .then(resultQuery => {
                client.del(categoryRedKey, (err, replay) => {
                    console.log(replay);
                });
                res.json({
                    status: 200,
                    message: 'success adding category',
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    status: 400,
                    message: 'error adding data'
                })
            })
    },
    deleteCategories: (req, res) => {
        const { id } = req.params
        const data = id
        categoriesModel.deleteCategories(data)
            .then(resultQuery => {
                client.del(categoryRedKey, (err, replay) => {
                    console.log(replay);
                });
                res.json({
                    status: 200,
                    message: 'success deleteing data',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    status: 400,
                    message: 'error adding data'
                })
            })
    },
    updateCategories: (req, res) => {
        const category = req.body.category
        const id = req.body.id
        const idCategory = id
        const data = { id, category }
        categoriesModel.updateCategories([data, idCategory])
            .then(resultQuery => {
                client.del(categoryRedKey, (err, replay) => {
                    console.log(replay);
                });
                res.json({
                    status: 200,
                    message: 'success updating data',
                    data
                })
            })
            .catch(err => {
                console.log(err.message);
                res.json({
                    status: 200,
                    message: 'error updateing data'
                })
            })
    },
    getCategoriesbyname: (req, res) => {
        const { category } = req.params
        const data = category
        categoriesModel.getCategoriesbyname(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: 'success getting data by name ' + data,
                    data: resultQuery
                })
            })
            .catch(err => {
                console.log(err.message);
                res.json({
                    status: 400,
                    message: 'error getting data ' + data
                })
            })
    }
}