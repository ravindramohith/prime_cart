const { createProduct } = require("../controllers/productController");

const router = require("express").Router();

router.route("/admin/").post(createProduct);

module.exports = router;
