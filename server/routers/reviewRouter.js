const { postProductReview } = require("../controllers/reviewController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").put(checkAuth, postProductReview);

module.exports = router;
