# PowerShell script to ensure all necessary routes and controllers are set up

# 1. Define MySQL connection details
$mysqlHost = "localhost"  # Change this to your MySQL host
$user = "root"            # Change this to your MySQL username
$password = "Micha@201"  # Change this to your MySQL password
$database = "ramc_erp"     # Your MySQL database

# 2. Ensure MySQL Database Schema is correct (Check if 'leave_requests' table exists)
$check_table_query = @"
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = '$database' AND table_name = 'leave_requests';
"@

$check_table_command = "mysql -h $mysqlHost -u $user -p$password -D $database -e '$check_table_query'"

$table_exists = Invoke-Expression $check_table_command

if ($table_exists -eq 0) {
    Write-Host "Leave Requests table not found. Creating it..."

    # SQL query to create leave_requests table if it doesn't exist
    $create_table_query = @"
    CREATE TABLE IF NOT EXISTS leave_requests (
        id INT NOT NULL AUTO_INCREMENT,
        employee_id INT NOT NULL,
        leave_type VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (employee_id) REFERENCES employees(id)
    );
    "@

    # Run the query to create the table
    $create_table_command = "mysql -h $mysqlHost -u $user -p$password -D $database -e '$create_table_query'"
    Invoke-Expression $create_table_command
}

# 3. Verify if the necessary controllers and routes are in place

# Check if 'leaveRoutes.js' exists
$leave_routes_path = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\backend\routes\leaveRoutes.js"
if (Test-Path $leave_routes_path) {
    Write-Host "'leaveRoutes.js' exists."
} else {
    Write-Host "'leaveRoutes.js' is missing. Creating a sample one..."

    # Creating leaveRoutes.js if not exists
    $leave_routes_script = @"
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

// Define POST endpoint for leave request
router.post('/', leaveController.createLeaveRequest);

module.exports = router;
"@
    Set-Content -Path $leave_routes_path -Value $leave_routes_script
}

# Check if 'leaveController.js' exists
$leave_controller_path = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\backend\controllers\leaveController.js"
if (Test-Path $leave_controller_path) {
    Write-Host "'leaveController.js' exists."
} else {
    Write-Host "'leaveController.js' is missing. Creating a sample one..."

    # Creating leaveController.js if not exists
    $leave_controller_script = @"
const db = require('../config/db');  // Your DB connection
const createLeaveRequest = (req, res) => {
    const { employee_id, leave_type, start_date, end_date, status, reason } = req.body;

    const query = 'INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status, reason) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [employee_id, leave_type, start_date, end_date, status, reason], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error creating leave request", error: err });
        }
        return res.status(201).json({ message: "Leave request created successfully", data: result });
    });
};

module.exports = { createLeaveRequest };
"@
    Set-Content -Path $leave_controller_path -Value $leave_controller_script
}

# 4. Ensure Express JSON middleware is included in 'server.js'

$server_file_path = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\server.js"
$server_file_content = Get-Content $server_file_path

if ($server_file_content -match "app\.use\(express\.json\(\)\)") {
    Write-Host "express.json() middleware is already included."
} else {
    Write-Host "Adding express.json() middleware to server.js..."
    $server_file_content = $server_file_content + "`napp.use(express.json());"
    Set-Content -Path $server_file_path -Value $server_file_content
}

# 5. Restart server to apply changes
Write-Host "Restarting the server..."
Stop-Process -Name "node" -Force
Start-Process "node" -ArgumentList "server.js"

Write-Host "All necessary routes, controllers, and database schema updates have been applied!"
