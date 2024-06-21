const express = require("express");
const router = express.Router();
const brandCotroller = require("../controllers/brand.controller");

router
  .route("/")
  .post(brandCotroller.createBrand)
  .get(brandCotroller.getBrands);
router.route("/:id").get(brandCotroller.getBrandById);

module.exports = router;
