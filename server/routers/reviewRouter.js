const {
  postProductReview,
  getAllProductReviews,
  deleteProductReview,
} = require("../controllers/reviewController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(checkAuth, getAllProductReviews)
  .put(checkAuth, postProductReview)
  .delete(checkAuth, authorizedRoles("admin"), deleteProductReview);

module.exports = router;
