const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

router.route("/bulk-update").patch(stockController.bulkUpdateStock);
router.route("/bulk-delete").delete(stockController.bulkDeleteStocks);

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createAStock);

router
  .route("/:id")
  .patch(stockController.updateAStock)
  .delete(stockController.deleteStockById);

module.exports = router;
