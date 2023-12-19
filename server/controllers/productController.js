const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
