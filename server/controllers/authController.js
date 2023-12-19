const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.getJWT();
  res.status(201).json({ success: true, data: user, token });
});
