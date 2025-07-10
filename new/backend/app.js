// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');


// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g. 'yourserver.mysql.database.azure.com'
  user: process.env.DB_USER,     // e.g. 'adminuser'
  password: process.env.DB_PASS, // your password
  database: process.env.DB_NAME  // e.g. 'ramcdb'
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
app.use('/api/tasks', taskRoutes);


// Example GET route for users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
