const { format } = require("date-fns");
const { Router } = require("express");
const messages = require("../data/messages.js");
const messageRouter = Router();

messageRouter.get("/:id", (req, res) => {
  const message = messages.find((x) => x.id === req.params.id);
  if (!message) return res.status(404).send("Message not found");
  res.render("pages/message", { title: "Message", message: message });
});

module.exports = messageRouter;
