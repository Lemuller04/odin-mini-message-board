const { format } = require("date-fns");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: crypto.randomUUID(),
  },
  {
    text: "Hello world!",
    user: "Charles",
    added: new Date(),
    id: crypto.randomUUID(),
  },
];

module.exports = messages;
