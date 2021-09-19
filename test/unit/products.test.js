const productController = require('../../controller/product');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const { before } = require('cheerio/lib/api/manipulation');


productModel.create = jest.fn()

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = newProduct
    })
    test("should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    })

    test("should call ProductModel.create", () => {
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })  

    test("should return 201 response code", () => {
        productController.createProduct(req,res, next);
        expect(res.statusCode).toBe(201);
        // 결과값이 잘 전송이 됐는지 -> _isEndCalled
        expect(res._isEndCalled).toBeTruthy();
    })

    test("should return json body in response", () => {
        productModel.create.mockReturnValue(newProduct);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })
})
