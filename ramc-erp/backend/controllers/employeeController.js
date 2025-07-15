const Employee = require('../models/employeeModel');

exports.getEmployees = (req, res) => {
    Employee.getAllEmployees((err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
};

exports.createEmployee = (req, res) => {
    const employee = req.body;
    Employee.createEmployee(employee, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Employee created', employeeId: result.insertId });
        }
    });
};
