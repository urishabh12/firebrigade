const express = require("express");
const router = express.Router();

const event_controller = require("../controller/event.controller");

router.post("/alert", event_controller.alert);

module.exports = router;
