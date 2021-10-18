const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct
test('POST /api/products', async() => {
    const response = await request(app)
        .post("/api/products")
        .send(newProduct)
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
    expect(response.body.price).toBe(newProduct.price) 
})

test('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: "phone"})

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: "product validation failed: description: Path `description` is required."})
})  

test("GET /api/products", async() => {
    const response = await request(app)
        .get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toBeDefined();
    firstProduct = response.body[0]
})

test("GET /api/products/:productId", async() => {
    const response = await request(app)
        .get('/api/products/'+ firstProduct._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
})

test("GET id doesnt exist /api/products/:productId", async() => {
    const response = await request(app)
        .get('/api/products/616918d1c9817e2936055e1f');

    expect(response.statusCode).toBe(404);
})

test("PUT /api/products/:productId", async() => {
    const response = await request(app)
        .put("/api/products/" + firstProduct._id)
        .send({
            name: "updated name",
            description: "updated description"
        })

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("updated name");
})

test("should return 404 on PUT /api/products", async () => {
    const response = await request(app)
        .put("/api/products/" + "619818d1c9817e2936055e1f")
        .send({
            name: "updated name",
            description: "updated description"
        })
    expect(response.statusCode).toBe(404);
})