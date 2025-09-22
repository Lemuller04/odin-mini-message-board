const express = require("express");
const router = express.Router();
const controller = require("../controllers/messagesController.js");

router.get("/", controller.messagesListGet);
router.get("/new", controller.messagesNewGet);
router.post("/new", controller.messagesNewPost);
router.get("/message/:id", controller.messageGetById);

module.exports = router;
