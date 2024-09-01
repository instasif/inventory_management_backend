const express = require("express");
const router = express.Router();
const supplierCotroller = require("../controllers/supplier.controller");
const { ensureAuthenticated } = require("../middleware/ensureAuthenticated");

router
  .route("/")
  .post(supplierCotroller.createsupplier)
  .get(ensureAuthenticated, supplierCotroller.getsuppliers);
router
  .route("/:id")
  .get(ensureAuthenticated, supplierCotroller.getSupplierById)
  .patch(supplierCotroller.updateSupplier);

module.exports = router;
