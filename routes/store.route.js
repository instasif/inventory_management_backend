const express = require("express");
const storeContoller = require("../controllers/store.contoller");
const { ensureAuthenticated } = require("../middleware/ensureAuthenticated");

const router = express.Router();

router
  .route("/")
  .get(ensureAuthenticated, storeContoller.getStores)
  .post(storeContoller.createAStore)
  .delete(storeContoller.deleteAStoreById);

module.exports = router;
