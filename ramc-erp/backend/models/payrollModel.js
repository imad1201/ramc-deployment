const db = require('../config/db');

const getAllPayrolls = (callback) => {
    db.query('SELECT payrolls.*, employees.name AS employee_name FROM payrolls JOIN employees ON payrolls.emp_id = employees.id', callback);
};

const createPayroll = (payroll, callback) => {
    db.query('INSERT INTO payrolls (emp_id, month, basic_salary, allowances, deductions) VALUES (?, ?, ?, ?, ?)',
        [payroll.emp_id, payroll.month, payroll.basic_salary, payroll.allowances, payroll.deductions],
        callback);
};

module.exports = { getAllPayrolls, createPayroll };
