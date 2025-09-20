const { format } = require("date-fns");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "PPPP - HH:mm"),
    id: crypto.randomUUID(),
  },
  {
    text: "Hello world!",
    user: "Charles",
    added: format(new Date(), "PPPP - HH:mm"),
    id: crypto.randomUUID(),
  },
];

module.exports = messages;
