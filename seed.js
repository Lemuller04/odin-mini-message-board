require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function seed() {
  try {
    await pool.query("DROP TABLE IF EXISTS message");

    await pool.query(`
      CREATE TABLE message (
        id SERIAL PRIMARY KEY,
        username VARCHAR(16) NOT NULL,
        message VARCHAR(255) NOT NULL,
        added TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(
      "INSERT INTO message (username, message) VALUES ($1, $2), ($3, $4), ($5, $6)",
      ["Leonardo", "Hello, world!", "Hornet", "Guaraná"],
    );

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
}

seed();
