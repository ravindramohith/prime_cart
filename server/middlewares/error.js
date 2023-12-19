const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Invalid Mongoose ID Error
  if (err?.name === "CastError")
    error = new ErrorHandler(`Resource not found. Invalid: ${err?.path}`, 404);

  if (process.env.NODE_ENV !== "PRODUCTION")
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
