// ==========================
// IMPORT REQUIRED PACKAGES
// ==========================
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

// ==========================
// INITIALIZE APP
// ==========================
const app = express();
const PORT = 3000;

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend files

// ==========================
// MYSQL DATABASE CONNECTION
// ==========================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",        // default XAMPP password
  database: "codveda_db"  // make sure this database exists
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

// ==========================
// ROUTES (CRUD OPERATIONS)
// ==========================

// READ: Get all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

// CREATE: Add new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "User added successfully" });
    }
  });
});

// UPDATE: Update user
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], err => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "User updated successfully" });
    }
  });
});

// DELETE: Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], err => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
