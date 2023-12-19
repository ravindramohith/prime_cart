const {
  createProduct,
  getAllProducts,
  getProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);
router.route("/admin/").post(createProduct);

module.exports = router;
