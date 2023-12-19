const User = require("../models/User");
const APIFactory = require("../utils/apiFactory");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

const ITEMS_PER_PAGE = 10;
exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(req.body.prevPassword);
  if (!isMatch)
    return next(new ErrorHandler("Current Password is incorrect", 401));

  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const apiFactory = new APIFactory(User, req.query).search().filter();
  let users = await apiFactory.query;
  const count = users.length;

  apiFactory.pagination(ITEMS_PER_PAGE);
  users = await apiFactory.query.clone();
  res.status(200).json({
    success: true,
    count,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
