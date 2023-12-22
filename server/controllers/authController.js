const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const { getResetPasswordTemplate } = require("../utils/emailTemplates");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../utils/sendEmail");
const sendTokenAsCookie = require("../utils/sendTokenAsCookie");
const crypto = require("crypto");

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

exports.signOut = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully signed out",
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorHandler("No user found with this email", 404));

  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/api/users/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user, resetUrl);

  await sendEmail({
    email: user.email,
    subject: "EShop Password Recovery",
    message,
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    })
    .catch(async (err) => {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpires = Date.now();
      await user.save();
      return next(new ErrorHandler(err?.message, 500));
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Hashing the URL token:
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Passwords do not match", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;
  await user.save();

  sendTokenAsCookie(user, 200, res);
});
