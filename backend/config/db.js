// backend/config/db.js

const mysql = require('mysql2');

// MySQL connection configuration
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Can be local or Azure
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'ramc_erp'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to database.');
});

module.exports = connection;
