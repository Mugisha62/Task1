
// IMPORT PACKAGES

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


// APP SETUP

const app = express();
const PORT = 3000;


// MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// MYSQL CONNECTION POOL 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",          
  database: "codveda_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected successfully");
    connection.release();
  }
});


// READ USERS
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("READ ERROR:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
});

// CREATE USER
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({ error: "Failed to insert user" });
    }

    res.json({
      message: "User added successfully",
      id: result.insertId
    });
  });
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const sql = "UPDATE users SET name=?, email=? WHERE id=?";
  db.query(sql, [name, email, id], err => {
    if (err) {
      console.error("UPDATE ERROR:", err);
      return res.status(500).json({ error: "Failed to update user" });
    }
    res.json({ message: "User updated successfully" });
  });
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], err => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }
    res.json({ message: "User deleted successfully" });
  });
});


// START SERVER

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
