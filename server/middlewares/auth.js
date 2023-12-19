const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.checkAuth = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new ErrorHandler("No token provided", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  if (!req.user) return next(new ErrorHandler("Invalid token, Please login again", 401));

  next();
});
