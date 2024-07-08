const express = require("express");
const categoryController = require("../controllers/category,controller");

const router = express.Router();

router.route("/").post(categoryController.createACategory);
router.route("/:id").delete(categoryController.deleteACategory);

module.exports = router;
