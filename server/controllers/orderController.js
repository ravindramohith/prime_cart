const Order = require("../models/Order");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.placeOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) return next(new ErrorHandler("Order not found", 404));

  if (req.user._id.toString() !== order.user._id.toString())
    return next(
      new ErrorHandler("You are not authorized to view this order", 403)
    );

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    order,
  });
});

exports.getCurrentUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    orders,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    orders,
  });
});

exports.processOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  console.log(req.params.id);

  if (!order) return next(new ErrorHandler("No Order found with this ID", 404));

  if (order?.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this order", 400));

  // Update products stock
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  order.orderStatus = req.body.orderStatus;
  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return next(new ErrorHandler("No Order found with this ID", 404));

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
