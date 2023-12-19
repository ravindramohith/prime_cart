const { signUp } = require("../controllers/authController");

const router = require("express").Router();

router.route("/signup").post(signUp);

module.exports = router;
