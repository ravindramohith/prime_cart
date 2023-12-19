const express = require("express");
const app = express();

// body parser
app.use(express.json());

// Routers
app.use("/api/products", require("./routers/productRouter"));

//Error Handler Middleware
app.use(require("./middlewares/error"));

module.exports = app;
