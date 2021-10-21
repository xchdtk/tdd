const { del } = require('superagent')
const Product = require('../models/Product')
const productModel = require('../models/Product')

exports.createProduct = async(req, res, next) => {
    try {
        const createProduct = await productModel.create(req.body)
        res.status(201).json(createProduct)
    } catch(error) {
        next(error)
    }
}

exports.getProducts = async(req, res, next) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    } catch(error) {
        next(error)
    }
}

exports.getProductById = async(req, res, next) => {
    try{
        const product = await productModel.findById(req.params.productId);
        if (product) {
            res.status(200).json(product);
            return
        }
        res.status(404).send("404 error")
    }catch(err) {
        next(err)
    }
}

exports.updateProduct = async(req, res, next) => {
    try{
        const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
        )
        if (updatedProduct) {
            res.status(200).json(updatedProduct)
            return
        }
        res.status(404).send();
    }
    catch(error) {
        next(error);
    }
}

exports.deleteProduct = async(req, res, next) => {
    try{
        let deletedProduct = await productModel.findByIdAndDelete(req.params.productId);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        }
        else {
            res.status(404).send();
        }
    } catch(err) {
        next(err);
    }
    
}