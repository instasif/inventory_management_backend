const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");

router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createAProduct);

router
  .route("/:id")
  .patch(productController.updateAProduct)
  .delete(productController.deleteProductById);

module.exports = router;
