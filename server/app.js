const express = require("express");
const app = express();

// body parser
app.use(express.json());

// Routers
app.use("/api/products", require("./routers/productRouter"));
app.use("/api/users", require("./routers/userRouter"));

//Error Handler Middleware
app.use(require("./middlewares/error"));

module.exports = app;
