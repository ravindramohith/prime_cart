const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { getCurrentUser } = require("../controllers/userController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(checkAuth, getCurrentUser);

module.exports = router;
