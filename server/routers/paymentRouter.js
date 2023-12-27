const {
  stripeCheckoutSession,
  postStripePayment,
} = require("../controllers/paymentController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/checkout_session").post(checkAuth, stripeCheckoutSession);
router.route("/webhook").post(postStripePayment);

module.exports = router;
