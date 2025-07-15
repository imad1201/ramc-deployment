// backend/controllers/leaveController.js

const getLeaveRequests = (req, res) => {
    // Mock data (you can replace this with actual database logic)
    const leaveRequests = [
        {
            employee_id: 1,
            leave_type: 'Annual Leave',
            start_date: '2025-07-15',
            end_date: '2025-07-20',
            status: 'Pending',
            reason: 'Vacation'
        },
        {
            employee_id: 2,
            leave_type: 'Sick Leave',
            start_date: '2025-07-16',
            end_date: '2025-07-18',
            status: 'Approved',
            reason: 'Illness'
        }
    ];

    // Sending the leave requests as a response
    res.status(200).json(leaveRequests);
};

module.exports = {
    getLeaveRequests  // Export the function to be used in routes
};
