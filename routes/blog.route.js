const express = require("express");
const router = express.Router();

const blog_controller = require("../controller/blog.controller");

router.get("/viewer", blog_controller.viewer);
router.post("/sender", blog_controller.sender);
router.post("/deleter", blog_controller.deleter);

module.exports = router;
