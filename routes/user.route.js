const express = require("express");
const userControllers = require("../controllers/user.controller");
const router = express.Router();

router.route("/signUp").post(userControllers.signUp);

module.exports = router;
