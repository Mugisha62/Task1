const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codveda_db"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    return;
  }
  console.log("MySQL Connected");
});

// CREATE user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], () => {
    res.send("User Added Successfully");
  });
});

// READ users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const sql = "UPDATE users SET name=?, email=? WHERE id=?";
  db.query(sql, [name, email, req.params.id], () => {
    res.send("User Updated Successfully");
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [req.params.id], () => {
    res.send("User Deleted Successfully");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
