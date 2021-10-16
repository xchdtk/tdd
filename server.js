const express = require('express')
const PORT = 8000;
const productRoutes = require('./route')
const mongoose = require('mongoose')

const connect = () => {
  mongoose
    .connect("mongodb://xchdtk:xwlstn12@localhost:27017/admin", {
      useNewUrlParser: true,
    }).then(() => console.log('mongodb connected...'))
    .catch((err) => console.log(err));
};

connect()

// App
const app = express()
app.use(express.json())
app.use('/api/products', productRoutes)
app.get('/', (req, res) => {
    res.send('hello world')
})

// error handling
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message})
})

app.listen(PORT, "0.0.0.0")
console.log('sever is running')

module.exports = app;