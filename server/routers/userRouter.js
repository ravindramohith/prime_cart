const { signUp, signIn, signOut } = require("../controllers/authController");

const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);

module.exports = router;
