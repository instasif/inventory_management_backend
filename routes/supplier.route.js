const express = require("express");
const router = express.Router();
const supplierCotroller = require("../controllers/supplier.controller");

router
  .route("/")
  .post(supplierCotroller.createsupplier)
  .get(supplierCotroller.getsuppliers);
router
  .route("/:id")
  .get(supplierCotroller.getSupplierById)
  .patch(supplierCotroller.updateSupplier);

module.exports = router;
