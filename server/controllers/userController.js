const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

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
