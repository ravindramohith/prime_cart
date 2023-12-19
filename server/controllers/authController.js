const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const sendTokenAsCookie = require("../utils/sendTokenAsCookie");

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  sendTokenAsCookie(user, 201, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please provide email and password", 400));
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return next(new ErrorHandler("No user found with this email", 404));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Password is incorrect", 401));

  sendTokenAsCookie(user, 200, res);
});
