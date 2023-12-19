const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").get(getAllProducts);
router.route("/admin/").post(createProduct);

module.exports = router;
