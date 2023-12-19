const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
