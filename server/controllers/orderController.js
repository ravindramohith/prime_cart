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

  if (
    req.user._id.toString() !== order.user._id.toString() &&
    req.user.role !== "admin"
  )
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
  if (req.body.orderStatus === "Delivered") order.deliveredAt = Date.now();

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

const getDatesInOrder = (startDate, endDate) => {
  const dates = [];
  const curr = new Date(startDate);
  while (curr <= new Date(endDate)) {
    dates.push(curr.toISOString().split("T")[0]);
    curr.setDate(curr.getDate() + 1);
  }

  return dates;
};
const getSalesData = async (startDate, endDate) => {
  const salesData = await Order.aggregate([
    {
      // 1. Filter results
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      // 2. Group results
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        numOrders: { $sum: 1 }, // count all orders
      },
    },
  ]);

  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;
  salesData?.forEach((entry) => {
    const date = entry._id.date;
    const sales = entry.totalSales;
    const numOrders = entry.numOrders;
    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });

  const dates = getDatesInOrder(startDate, endDate);

  const mappedSales = dates.map((date) => ({
    date,
    sales: salesMap.get(date)?.sales || 0,
    numOrders: salesMap.get(date)?.numOrders || 0,
  }));

  return { salesData: mappedSales, totalSales, totalNumOrders };
};

exports.getSales = catchAsync(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  startDate.setUTCHours(0, 0, 0, 0); // starts from 12AM
  endDate.setUTCHours(23, 59, 59, 999); // EOD

  const { salesData, totalSales, totalNumOrders } = await getSalesData(
    startDate,
    endDate
  );

  res.status(200).json({
    success: true,
    sales: salesData,
    totalSales,
    totalNumOrders,
  });
});
