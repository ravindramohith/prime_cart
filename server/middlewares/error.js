module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };
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
