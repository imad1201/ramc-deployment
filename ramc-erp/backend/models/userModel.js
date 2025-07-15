const db = require('../config/db');

// Get all users
const getAllUsers = (callback) => {
    db.query('SELECT users.id, users.name, users.email, roles.name AS role, users.status, users.created_at FROM users JOIN roles ON users.role_id = roles.id', callback);
};

// Create new user
const createUser = (user, callback) => {
    db.query('INSERT INTO users (name, email, hashed_password, role_id) VALUES (?, ?, ?, ?)',
        [user.name, user.email, user.hashed_password, user.role_id],
        callback);
};

module.exports = { getAllUsers, createUser };
// Existing imports and functions...
// Add this new function:

const getUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail
};
