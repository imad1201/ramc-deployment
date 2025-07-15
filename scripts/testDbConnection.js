// testDbConnection.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ramc-erptest.mysql.database.azure.com',
  user: 'imad',
  password: 'Micha@201',  // Replace with your actual password
  database: 'hrms',
  ssl: {
    rejectUnauthorized: false  // Disabling SSL certificate validation (only for testing)
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});
