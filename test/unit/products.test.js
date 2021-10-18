const productController = require('../../controller/product');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();

const productId = "615ffd1e5f373cb30f0f208e";
const updatedProduct = { name: "jinsoo", description: "hello"};
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = newProduct
    })
    test("should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    })

    test("should call ProductModel.create", async() => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })  

    test("should return 201 response code", async() => {
        await productController.createProduct(req,res, next);
        expect(res.statusCode).toBe(201);
        // 결과값이 잘 전송이 됐는지 -> _isEndCalled
        expect(res._isEndCalled).toBeTruthy();
    })

    test("should return json body in response", async() => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })

    test('should handle errors', async () => {
        const errorMessage = { message: "description property missing" }
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.create.mockReturnValue(rejectedPromise)
        await productController.createProduct(req, res, next)
        expect(next).toBeCalledWith(errorMessage) 
    })
})

describe("Product Controller Get", () => {
    test("should have a getProducts function", () => {
        expect(typeof productController.getProducts).toBe("function");
    })

    test("should call ProductModel.find({})", async() => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    })

    test("should return 200 response", async() => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })

    test("should return json body in response", async() => {
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    })

    test('should handle errors', async() => {
        const errorMessage = { message: 'error finding product data'}
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe("Product Contoller GetById", () => {
    test("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function");
    })

    test("should call productMode.findById", async() => {
        req.params.productId = productId
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);

    })
    test("should return json body and response code 200", async() => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("should return 404 when item doesnt exist", async() => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("should handle errors", async() => {
        const errorMessage = { message: "error"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe("Product Controller Update", () => {
    beforeEach(() => {
        req.body = updatedProduct;
        req.params.productId = productId;
    })

    test("should have an updateProduct function", () => {
        expect(typeof productController.updateProduct).toBe("function");
    })

    test("should call productModel.findByIdAndUpdate", async() => {
        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, 
            updatedProduct,
            { new: true}
        );
    })

    test("should return json body and response code 200", async() => {
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
        await productController.updateProduct(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    })

    test("should handle 404 when item doesnt exist", async() => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test("should handle errors", async () => {
        const errorMessage = { message: "Error"};
        const rejectPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

