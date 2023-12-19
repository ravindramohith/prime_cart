const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
