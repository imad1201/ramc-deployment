const db = require('../config/db');

// Function to get all employees
const getAllEmployees = (callback) => {
    db.query('SELECT * FROM employees', callback);
};

// Function to add a new employee
const createEmployee = (employee, callback) => {
    db.query('INSERT INTO employees (first_name, last_name, national_id, gender, date_of_birth, hire_date, position, department_id, contact_number, email, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [employee.first_name, employee.last_name, employee.national_id, employee.gender, employee.date_of_birth, employee.hire_date, employee.position, employee.department_id, employee.contact_number, employee.email, employee.salary],
        callback);
};

module.exports = {
    getAllEmployees,
    createEmployee
};
