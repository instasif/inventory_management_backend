const express = require("express");
const storeContoller = require("../controllers/store.contoller");

const router = express.Router();

router
  .route("/")
  .get(storeContoller.getStores)
  .post(storeContoller.createAStore)
  .delete(storeContoller.deleteAStoreById);

module.exports = router;
