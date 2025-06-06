import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

app.use(rateLimiter);
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

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Visit http://localhost:${PORT} to see the backend response.`);
  })
})