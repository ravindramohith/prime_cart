const Product = require("../models/Product");
const APIFactory = require("../utils/apiFactory");
const catchAsync = require("../utils/catchAsync");
const { uploadFile, deleteFile } = require("../utils/cloudinary");
const ErrorHandler = require("../utils/errorHandler");

const ITEMS_PER_PAGE = 4;

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const apiFactory = new APIFactory(Product, req.query).search().filter();
  let products = await apiFactory.query;
  const count = products.length;

  const itemsPerPage = req.query.itemsPerPage || ITEMS_PER_PAGE;
  apiFactory.pagination(itemsPerPage);
  products = await apiFactory.query.clone();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    count,
    itemsPerPage,
    data: products,
  });
});

exports.getAllProductsAdmin = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user"
  );
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

exports.updateProduct = catchAsync(async (req, res, next) => {
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

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  for (let i = 0; i < product.images.length; i++) {
    await deleteFile(product.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.uploadProductImages = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  const uploader = async (image) => uploadFile(image, "eshop/products");

  const urls = await Promise.all(req.body.images.map(uploader));
  product?.images?.push(...urls);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product Images Uploaded successfully",
  });
});

exports.deleteProductImage = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.params.id}`, 404)
    );

  const deleted = await deleteFile(req.body.imgId);
  if (deleted) {
    product.images = product.images.filter(
      (img) => img.public_id !== req.body.imgId
    );
    await product.save();
  }

  res.status(200).json({
    success: true,
    message: "Product Image Deleted successfully",
  });
});
