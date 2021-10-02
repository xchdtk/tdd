const request = require('supertest');
const { resource } = require('../../server');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

it('POST /api/products', async() => {
    const response = await request(app)
        .post("/api/products")
        .send(newProduct)
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
    expect(response.body.price).toBe(newProduct.price) 
})

it('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: "phone"})
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: "product validation failed: description: Path `description` is required."})
})