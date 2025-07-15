// index.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Employee Routes
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/employees', (req, res) => {
  const { name, position, salary, hire_date } = req.body;
  db.query(
    'INSERT INTO employees (name, position, salary, hire_date) VALUES (?, ?, ?, ?)', 
    [name, position, salary, hire_date],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Employee added');
    }
  );
});

// Leave Request Routes
app.get('/leave-requests', (req, res) => {
  db.query('SELECT * FROM leave_requests', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/leave-requests', (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  db.query(
    'INSERT INTO leave_requests (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)', 
    [employee_id, start_date, end_date, reason],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Leave request added');
    }
  );
});

// Payroll Routes
app.get('/payroll', (req, res) => {
  db.query('SELECT * FROM payroll', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Attendance Routes
app.get('/attendance', (req, res) => {
  db.query('SELECT * FROM attendance', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`HRMS app listening at http://localhost:${port}`);
});
