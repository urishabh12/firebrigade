const express = require("express");
const router = express.Router();

const event_controller = require("../controller/event.controller");

router.post("/alert", event_controller.alert);
router.post("/respond", event_controller.respond);
router.get("/getall", event_controller.getall);

module.exports = router;
