const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createAProduct);


router.route("/:id").patch(productController.updateAProduct).delete(productController.deleteProductById);

module.exports = router;
