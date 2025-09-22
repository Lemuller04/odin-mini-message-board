const pool = require("./pools.js");

async function getAllMessages() {
  const result = await pool.query(
    "SELECT id, username, message, added FROM message",
  );
  return result.rows;
}

async function createMessage(author, message) {
  await pool.query("INSERT INTO message (username, message) VALUES ($1, $2)", [
    author,
    message,
  ]);
}

async function getMessageById(id) {
  const result = await pool.query(
    "SELECT id, username, message, added FROM message WHERE id = ($1)",
    [id],
  );
  return result.rows;
}

module.exports = {
  getAllMessages,
  createMessage,
  getMessageById,
};
