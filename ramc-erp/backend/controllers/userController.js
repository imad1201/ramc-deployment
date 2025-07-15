const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
};

exports.createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const user = { name, email, hashed_password, role_id };

    User.createUser(user, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'User created', userId: result.insertId });
        }
    });
};
const jwt = require('jsonwebtoken');

// Existing exports...

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.getUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.hashed_password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role_id: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    });
};
