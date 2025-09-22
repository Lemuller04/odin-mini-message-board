const { body, validationResult } = require("express-validator");
const rawMessages = require("../data/messages.js");
const db = require("../db/queries.js");

async function messagesListGet(req, res) {
  const rawMessages = await db.getAllMessages();
  const messages = rawMessages.map((msg) => ({
    ...msg,
    dateFormatted: msg.added.toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  res.render("pages/index", {
    title: "Mini Message Board",
    messages: messages,
  });
}

async function messagesNewGet(req, res) {
  res.render("pages/form", { title: "Add a New Message" });
}

const validateMessage = [
  body("author")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("User name must contain between 1 and 16 characters."),
  body("message")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Message must contain between 1 and 255 characters."),
];

async function messagesNewPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("pages/form", {
      title: "Add a New Message",
      errors: errors,
      data: req.body,
    });
  }

  const { author, message } = req.body;
  await db.createMessage(author, message);
  res.redirect("/");
}

async function messageGetById(req, res) {
  const message = await db.getMessageById(req.params.id);

  message[0].dateFormatted = message[0].added.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  res.render("pages/message", {
    title: "Message Details",
    msg: message[0],
  });
}

module.exports = {
  messagesListGet,
  messagesNewGet,
  messagesNewPost,
  messageGetById,
};
