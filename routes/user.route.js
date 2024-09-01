const express = require("express");
const userControllers = require("../controllers/user.controller");
const router = express.Router();

router.route("/signUp").post(userControllers.signUp);
router.route("/logIn").post(userControllers.logIn);

module.exports = router;