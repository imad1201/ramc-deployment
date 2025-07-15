// batchDatabaseQuery.js

const mysql = require('mysql2'); 
const limit = 500;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Micha@201',
  database: 'ramc_erp'
});

// Function to fetch users in batches
function fetchUsers(offset = 0, limit = 100) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
    connection.query(query, (error, results) => {
      if (error) reject(error);
      resolve(results);
async function processData() {
  let offset = 0;
  const limit = 100;

  while (true) {
    try {
      const data = await fetchData(offset, limit);
      if (data.length === 0) break;  // No more data to fetch

      console.log(`Processing ${data.length} records`);
      // Process the data here

      offset += limit;  // Move to the next batch
    } catch (error) {
      console.error('Error processing data:', error);
      break;  // Exit the loop if there’s an error
    }
  }

  connection.end();  // Close the connection after processing
}

    });
  });
}

// Function to process users in batches
async function processUsers() {
  let offset = 0;
  const limit = 100;  // Process 100 records at a time

  while (true) {
    const users = await fetchUsers(offset, limit);
    if (users.length === 0) break;  // Exit loop when no more data is available

    console.log(`Processing ${users.length} users`);
    // Process each batch of users
    offset += limit;  // Move to the next batch
  }
}

// Run the process
processUsers();
