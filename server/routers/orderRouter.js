const { placeOrder, getOrder } = require("../controllers/orderController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").post(checkAuth, placeOrder);
router.route("/:id").get(checkAuth, getOrder);

module.exports = router;
