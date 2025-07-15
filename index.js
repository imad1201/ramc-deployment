// Load environment variables from .env file with debug
const dotenv = require('dotenv');
const path = require('path');

// Log the current working directory to ensure it's correct
console.log('Current Working Directory:', process.cwd());  // Check the directory

// Load environment variables explicitly from the .env file
const result = dotenv.config({ path: './.env' });

if (result.error) {
    console.error("Error loading .env file:", result.error);
    process.exit(1); // Exit if .env file loading fails
}

console.log('Environment variables loaded:', process.env);  // Log environment variables
console.log('CERT_PATH:', process.env.CERT_PATH);  // Check if CERT_PATH is loaded correctly

// Log the database credentials to ensure they are loaded correctly
console.log('DB_USER:', process.env.DB_USER); // Check if DB_USER is loaded
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Check if DB_PASSWORD is loaded

// Ensure we only require mysql2 once
const mysql = require('mysql2'); 
const fs = require('fs');

// Use absolute path directly for testing
const certPath = 'C:/Users/imad/OneDrive/Desktop/RAMC-Deployment/certificates/BaltimoreCyberTrustRoot.crt.pem';

// Check if the certificate file exists
if (!fs.existsSync(certPath)) {
    console.error(`Error: Certificate file not found at: ${certPath}`);
    process.exit(1); // Exit if certificate not found
}

// Create a MySQL connection with SSL support (disable certificate validation)
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Database host
    user: process.env.DB_USER, // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
    port: 3306, // MySQL default port
    ssl: {
        ca: fs.readFileSync(certPath),  // Using the certificate directly from the absolute path
        rejectUnauthorized: false  // Allow self-signed certificates
    }
});

// Test the database connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});

// Example of inserting a new employee into the database
function insertEmployee(name, position, salary, departmentId) {
    const query = `INSERT INTO employees (name, position, salary, department_id) 
                   VALUES (?, ?, ?, ?)`;

    connection.execute(query, [name, position, salary, departmentId], (err, results) => {
        if (err) {
            console.error('Error inserting employee: ' + err.stack);
            return;
        }
        console.log(`Inserted new employee with ID: ${results.insertId}`);
    });
}

// Example of updating an employee's information
function updateEmployee(id, name, position, salary, departmentId) {
    const query = `UPDATE employees SET name = ?, position = ?, salary = ?, department_id = ? WHERE id = ?`;

    connection.execute(query, [name, position, salary, departmentId, id], (err, results) => {
        if (err) {
            console.error('Error updating employee: ' + err.stack);
            return;
        }
        console.log(`Updated employee with ID: ${id}`);
    });
}

// Example of deleting an employee from the database
function deleteEmployee(id) {
    const query = `DELETE FROM employees WHERE id = ?`;

    connection.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting employee: ' + err.stack);
            return;
        }
        console.log(`Deleted employee with ID: ${id}`);
    });
}

// Example of fetching all employees from the database
function getEmployees() {
    const query = `SELECT * FROM employees`;

    connection.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching employee data: ' + err.stack);
            return;
        }
        console.log('Employee data: ', results);
    });
}

// Example of inserting a department into the database
function insertDepartment(departmentName) {
    const query = `INSERT INTO departments (department_name) VALUES (?)`;

    connection.execute(query, [departmentName], (err, results) => {
        if (err) {
            console.error('Error inserting department: ' + err.stack);
            return;
        }
        console.log(`Inserted new department with ID: ${results.insertId}`);
    });
}

// Test: Insert employees, departments, and fetch data
insertEmployee('John Doe', 'Manager', 50000.00, 1);
insertEmployee('Jane Smith', 'Engineer', 45000.00, 2);
insertDepartment('Sales');
insertDepartment('Engineering');

// Run a query to get all employees
getEmployees();

// Update an employee
updateEmployee(1, 'John Doe', 'Senior Manager', 60000.00, 1);

// Delete an employee
deleteEmployee(2);

// Gracefully end the connection after a short delay to allow queries to finish
setTimeout(() => {
    connection.end((err) => {
        if (err) {
            console.error('Error ending the connection: ' + err.stack);
        } else {
            console.log('Connection closed.');
        }
    });
}, 5000); // Wait 5 seconds before closing the connection to ensure queries are finished
