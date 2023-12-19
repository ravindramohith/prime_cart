const Order = require("../models/Order");
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
  const order = await Order.findById(req.params.id);
  if (req.user._id.toString() !== order.user.toString())
    return next(
      new ErrorHandler("You are not authorized to view this order", 403)
    );

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    order,
  });
});
