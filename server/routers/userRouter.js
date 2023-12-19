const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
} = require("../controllers/authController");

const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/password/forgot").post(forgotPassword);

module.exports = router;
