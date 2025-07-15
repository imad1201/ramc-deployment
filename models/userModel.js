const db = require('../config/db');

// Function to get all users
const getAllUsers = (callback) => {
    db.query('SELECT users.id, users.username, users.email, roles.name AS role, users.status, users.created_at FROM users JOIN roles ON users.role_id = roles.id', callback);
};

// Function to create a new user
const createUser = (user, callback) => {
    db.query('INSERT INTO users (username, email, hashed_password, role_id) VALUES (?, ?, ?, ?)',
        [user.username, user.email, user.hashed_password, user.role_id],
        callback);
};

module.exports = {
    getAllUsers,
    createUser
};
