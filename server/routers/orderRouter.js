const {
  placeOrder,
  getOrder,
  getCurrentUserOrders,
  getAllOrders,
} = require("../controllers/orderController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(checkAuth, authorizedRoles("admin"), getAllOrders)
  .post(checkAuth, placeOrder);
router.route("/:id").get(checkAuth, getOrder);
router.route("/my/orders").get(checkAuth, getCurrentUserOrders);

module.exports = router;
