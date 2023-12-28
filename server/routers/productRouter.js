const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
} = require("../controllers/productController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(getAllProducts)
  .post(checkAuth, authorizedRoles("admin"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(checkAuth, authorizedRoles("admin"), updateProduct)
  .delete(checkAuth, authorizedRoles("admin"), deleteProduct);

router
  .route("/get/admin/")
  .get(checkAuth, authorizedRoles("admin"), getAllProductsAdmin);

module.exports = router;
