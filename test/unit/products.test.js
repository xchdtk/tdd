const productController = require('../../controller/product');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');


productModel.create = jest.fn()

describe("Product Controller Create", () => {
    test("should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    })

    test("should call ProductModel.create", () => {
        let req = httpMocks.createRequest();
        let res = httpMocks.createResponse();
        let next = null;
        req.body = newProduct
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })
})
