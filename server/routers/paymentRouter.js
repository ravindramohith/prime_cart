const { stripeCheckoutSession } = require("../controllers/paymentController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/checkout_session")
  .post(checkAuth, stripeCheckoutSession);

module.exports = router;
