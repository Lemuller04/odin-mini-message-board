const { format } = require("date-fns");
const { Router } = require("express");
const messages = require("../data/messages.js");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Mini-Message Board",
    messages: messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("pages/form", { title: "New Message" });
});

indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.author,
    added: format(new Date(), "PPPP - HH:mm"),
    id: crypto.randomUUID(),
  });

  res.redirect("/");
});

module.exports = indexRouter;
