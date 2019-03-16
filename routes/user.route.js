const express = require("express");
const router = express.Router();

const user_controller = require("../controller/user.controller");

router.post("/registration", user_controller.registration);
router.post("/login", user_controller.login);

module.exports = router;
