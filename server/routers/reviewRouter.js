const {
  postProductReview,
  getAllProductReviews,
  deleteProductReview,
  checkUserReview,
} = require("../controllers/reviewController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(checkAuth, getAllProductReviews)
  .put(checkAuth, postProductReview)
  .delete(checkAuth, authorizedRoles("admin"), deleteProductReview);

router.route("/check_review").get(checkAuth, checkUserReview);

module.exports = router;
