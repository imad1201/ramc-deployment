const Payroll = require('../models/payrollModel');

exports.getPayrolls = (req, res) => {
    Payroll.getAllPayrolls((err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
};

exports.createPayroll = (req, res) => {
    const payroll = req.body;
    Payroll.createPayroll(payroll, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Payroll created', payrollId: result.insertId });
        }
    });
};
