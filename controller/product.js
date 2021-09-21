const productModel = require('../models/Product')

exports.createProduct = async(req, res, next) => {
    console.log(req.body)
    const createProduct = await productModel.create(req.body)
    res.status(201).json(createProduct)
}