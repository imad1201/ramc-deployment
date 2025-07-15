// backend/controllers/employeeController.js
const db = require('../config/db');

// Get all employees
const getAllEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

// Create a new employee
const createEmployee = (req, res) => {
  const { first_name, last_name, email, salary, department_id } = req.body;
  db.query(
    'INSERT INTO employees (first_name, last_name, email, salary, department_id) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, salary, department_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Employee created successfully' });
    }
  );
};

module.exports = { getAllEmployees, createEmployee };
