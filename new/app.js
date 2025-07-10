// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);


// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Status check route
app.get('/api/status', (req, res) => {
  res.send({ status: 'ok' });
});

// MySQL Database connection with SSL for Azure
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g. 'ramc-erptest.mysql.database.azure.com'
  user: process.env.DB_USER,     // e.g. 'imad@ramc-erptest'
  password: process.env.DB_PASS, // your password
  database: process.env.DB_NAME, // e.g. 'ramcdb'
  ssl: {
    rejectUnauthorized: true
  }
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as id ' + db.threadId);
});

// Root route
app.get('/', (req, res) => {
  res.send('RAMC Minimal MVP Backend is running.');
});

// Example GET route for users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('❌ DB Query Error:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
