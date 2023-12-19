const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Routers
app.use("/api/products", require("./routers/productRouter"));
app.use("/api/users", require("./routers/userRouter"));
app.use("/api/orders", require("./routers/orderRouter"));

//Error Handler Middleware
app.use(require("./middlewares/error"));

module.exports = app;
