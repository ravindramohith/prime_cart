const {
  placeOrder,
  getOrder,
  getCurrentUserOrders,
} = require("../controllers/orderController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").post(checkAuth, placeOrder);
router.route("/:id").get(checkAuth, getOrder);
router.route("/my/orders").get(checkAuth, getCurrentUserOrders);

module.exports = router;
