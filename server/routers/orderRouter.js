const { placeOrder } = require("../controllers/orderController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").post(checkAuth, placeOrder);

module.exports = router;
