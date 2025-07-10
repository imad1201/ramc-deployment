// Import required modules
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create MySQL connection (adjust path or import if using a central db config)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed (taskRoutes): ', err.stack);
    return;
  }
  console.log('✅ taskRoutes connected to MySQL as id ' + db.threadId);
});

// GET all tasks
router.get('/', (req, res) => {
  db.query('SELECT * FROM Tasks', (err, results) => {
    if (err) {
      console.error('❌ DB Query Error (GET /tasks):', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// POST new task
router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  const sql = 'INSERT INTO Tasks (title, description, status) VALUES (?, ?, ?)';
  db.query(sql, [title, description, status], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error (POST /tasks):', err);
      res.status(500).json({ error: 'Database insert failed' });
    } else {
      res.status(201).json({ message: 'Task created', taskId: result.insertId });
    }
  });
});

module.exports = router;
