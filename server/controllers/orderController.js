const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");

exports.placeOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});
