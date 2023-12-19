const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Cast Error; Ex:Invalid Mongoose ID Error
  if (err?.name === "CastError")
    error = new ErrorHandler(
      `Resource not found. Invalid ${err?.path}: ${err?.value}`,
      404
    );

  // Duplicate key error
  if (err?.code === 11000)
    error = new ErrorHandler(
      `Duplicate ${Object.keys(err.keyValue)} Entered`,
      400
    );

  // Validation Error
  if (err?.name === "ValidationError")
    error = new ErrorHandler(
      Object.values(err.errors).map((value) => value.message),
      400
    );

  // Wrong Jwt error
  if (err.name === "JsonWebTokenError")
    err = new ErrorHandler(`JSON Web Token is invalid. Please Try again!`, 400);

  //Jwt expired error
  if (err.name === "TokenExpiredError")
    err = new ErrorHandler(`JSON Web Token is expired. Please Try again!`, 400);

  if (process.env.NODE_ENV === "PRODUCTION")
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  else
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: err,
      stack: err?.stack,
    });
};
