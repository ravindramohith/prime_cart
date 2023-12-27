const Order = require("../models/Order");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.postProductReview = catchAsync(async (req, res, next) => {
  const review = {
    user: req.user._id,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  const product = await Product.findById(req.body.productId);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.body.productId}`, 404)
    );

  const alreadyReviewed = product.reviews?.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  console.log(alreadyReviewed);

  if (alreadyReviewed) {
    product.reviews?.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = Number(req.body.rating);
        review.comment = req.body.comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review posted successfully",
  });
});

exports.getAllProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  console.log(req.query);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.query.productId}`, 404)
    );

  res.status(200).json({
    success: true,
    count: product.reviews.length,
    message: "Reviews fetched successfully",
    reviews: product.reviews,
  });
});

exports.deleteProductReview = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product)
    return next(
      new ErrorHandler(`Product not found with id: ${req.query.productId}`, 404)
    );

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    product,
  });
});

exports.checkUserReview = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });

  if (orders.length > 0)
    res.status(200).json({ success: true, canReview: true });
  else res.status(200).json({ success: true, canReview: false });
});
