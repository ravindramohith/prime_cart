const express = require("express");
const app = express();

// body parser
app.use(express.json());

// Routers
app.use("/api/products", require("./routers/productRouter"));

module.exports = app;
