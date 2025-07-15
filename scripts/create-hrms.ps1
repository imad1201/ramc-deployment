# Define MySQL login credentials and database connection details
$mysqlHost = "ramc-erptest.mysql.database.azure.com"
$mysqlUser = "imad"
$mysqlPassword = "Micha@201" # 
$databaseName = "ramc_hrms"

# SQL queries to create the HRMS database and tables
$sqlQueries = @"
-- Create Database
CREATE DATABASE IF NOT EXISTS $databaseName;

-- Switch to the HRMS database
USE $databaseName;

-- Create Employees Table
CREATE TABLE IF NOT EXISTS Employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    hire_date DATE NOT NULL,
    department VARCHAR(100),
    job_title VARCHAR(100),
    salary DECIMAL(10, 2),
    status ENUM('Active', 'Inactive', 'Resigned', 'Retired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Attendance Table
CREATE TABLE IF NOT EXISTS Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Leave', 'Late', 'Holiday') DEFAULT 'Absent',
    check_in TIME,
    check_out TIME,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Leave Requests Table
CREATE TABLE IF NOT EXISTS LeaveRequests (
    leave_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    leave_type ENUM('Sick Leave', 'Annual Leave', 'Maternity Leave', 'Unpaid Leave', 'Other'),
    start_date DATE,
    end_date DATE,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Create Payroll Table
CREATE TABLE IF NOT EXISTS Payroll (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    basic_salary DECIMAL(10, 2),
    bonuses DECIMAL(10, 2),
    deductions DECIMAL(10, 2),
    net_salary DECIMAL(10, 2),
    salary_month DATE,
    payment_date DATE,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Performance Appraisal Table
CREATE TABLE IF NOT EXISTS PerformanceAppraisals (
    appraisal_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    appraisal_date DATE NOT NULL,
    performance_score INT CHECK (performance_score >= 1 AND performance_score <= 5),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);
"@

# Establish MySQL connection and execute the script
$mysqlCommand = "mysql -h $mysqlHost -u $mysqlUser -p$mysqlPassword -e `"$sqlQueries`""

# Run the MySQL command
Invoke-Expression $mysqlCommand

Write-Host "HRMS database and tables have been created successfully!" -ForegroundColor Green
