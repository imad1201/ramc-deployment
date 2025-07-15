// databaseConnection.js
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',        // Change this if you're connecting to a remote database
  user: 'root',             // Your MySQL username
  password: 'Micha@201', // Your MySQL password
  database: 'ramc_erp'  // The database you're connecting to
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Close the connection after use
connection.end();
