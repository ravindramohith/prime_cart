const {
  placeOrder,
  getOrder,
  getCurrentUserOrders,
  getAllOrders,
  processOrder,
  deleteOrder,
  getSales,
} = require("../controllers/orderController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(checkAuth, authorizedRoles("admin"), getAllOrders)
  .post(checkAuth, placeOrder);
router
  .route("/:id")
  .get(checkAuth, getOrder)
  .put(checkAuth, authorizedRoles("admin"), processOrder)
  .delete(checkAuth, authorizedRoles("admin"), deleteOrder);
router.route("/my/orders").get(checkAuth, getCurrentUserOrders);

router.route("/admin/get_sales").get(checkAuth, authorizedRoles("admin"), getSales);

module.exports = router;
