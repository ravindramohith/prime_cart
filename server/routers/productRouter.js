const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { checkAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(getAllProducts).post(checkAuth, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(checkAuth, updateProduct)
  .delete(checkAuth, deleteProduct);

module.exports = router;
