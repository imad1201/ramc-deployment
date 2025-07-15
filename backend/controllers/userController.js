// backend/controllers/userController.js
const db = require('../config/db');

// Get all users
const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { name, email, hashed_password, role_id } = req.body;
  db.query(
    'INSERT INTO users (name, email, hashed_password, role_id) VALUES (?, ?, ?, ?)',
    [name, email, hashed_password, role_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'User created successfully' });
    }
  );
};

module.exports = { getAllUsers, createUser };
