const {
  postProductReview,
  getAllProductReviews,
} = require("../controllers/reviewController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(checkAuth, getAllProductReviews)
  .put(checkAuth, postProductReview);

module.exports = router;
