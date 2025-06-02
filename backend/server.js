import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is", req.method);
//   next();
// })

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id  VARCHAR(100) NOT NULL,
      title  VARCHAR(100) NOT NULL,
      amount  DECIMAL(10,2) NOT NULL,
      category  VARCHAR(100) NOT NULL,
      created_at DATE DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);

  }
}

app.get("/", (req, res) => {
  res.send("Hello from the backend! This is the backend server.");
})

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !amount || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required." })
    }

    const transaction = await sql`INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING*`;

    console.log(transaction)

    res.status(201).json({ transaction: transaction[0] });

  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error." });

  }
})


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Visit http://localhost:${PORT} to see the backend response.`);
  })
})