const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct);

module.exports = router;
