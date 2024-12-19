const express = require("express");
const router = express.Router();
const brandCotroller = require("../controllers/brand.controller");
const { ensureAuthenticated } = require("../middleware/ensureAuthenticated");

router
  .route("/")
  .post(brandCotroller.createBrand)
  .get(brandCotroller.getBrands);
router
  .route("/:id")
  .get(brandCotroller.getBrandById)
  .patch(brandCotroller.updateBrand);

module.exports = router;
