# Define MySQL connection details
$db_host = "localhost"   # Change to your MySQL host (e.g., 'localhost' or 'azure-db-host')
$user = "root"           # Your MySQL user
$password = "Micha@201"   # Your MySQL password 
$database = "ramc_erp"   # Your MySQL database

# Load MySQL .NET Connector (MySql.Data)
Add-Type -Path "C:\Program Files (x86)\MySQL\Connector Net 8.0\Assemblies\v4.5\MySql.Data.dll"  # Adjust the path based on where the MySQL connector is installed

# Connection string
$connectionString = "server=$db_host;uid=$user;pwd=$password;database=$database;"

# Full SQL query to create schema and tables
$sqlQuery = @"
-- Create Schemas
CREATE SCHEMA IF NOT EXISTS Aircraft;
CREATE SCHEMA IF NOT EXISTS Maintenance;
CREATE SCHEMA IF NOT EXISTS Inventory;
CREATE SCHEMA IF NOT EXISTS Financials;

-- Aircraft Schema Tables
CREATE TABLE IF NOT EXISTS Aircraft.Aircraft (
    aircraft_id INT PRIMARY KEY AUTO_INCREMENT,
    registration_number VARCHAR(100) UNIQUE,
    model VARCHAR(100),
    manufacturer VARCHAR(100),
    serial_number VARCHAR(100) UNIQUE,
    aircraft_type VARCHAR(50),
    status VARCHAR(50),
    last_maintenance_date DATE,
    next_maintenance_due DATE,
    total_flying_hours INT,
    total_cycles INT
);

CREATE TABLE IF NOT EXISTS Aircraft.Engines (
    engine_id INT PRIMARY KEY AUTO_INCREMENT,
    aircraft_id INT,
    engine_model VARCHAR(100),
    serial_number VARCHAR(100) UNIQUE,
    installation_date DATE,
    hours_since_installation INT,
    cycles_since_installation INT,
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft.Aircraft(aircraft_id)
);

CREATE TABLE IF NOT EXISTS Aircraft.Flight_Log (
    flight_id INT PRIMARY KEY AUTO_INCREMENT,
    aircraft_id INT,
    flight_date DATE,
    departure_location VARCHAR(100),
    arrival_location VARCHAR(100),
    flight_hours INT,
    flight_cycles INT,
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft.Aircraft(aircraft_id)
);

-- Maintenance Schema Tables
CREATE TABLE IF NOT EXISTS Maintenance.Work_Orders (
    work_order_id INT PRIMARY KEY AUTO_INCREMENT,
    aircraft_id INT,
    work_order_type VARCHAR(100),
    description TEXT,
    status VARCHAR(50),
    start_date DATE,
    end_date DATE,
    cost_estimate DECIMAL(15, 2),
    actual_cost DECIMAL(15, 2),
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft.Aircraft(aircraft_id)
);

CREATE TABLE IF NOT EXISTS Maintenance.Repair_Orders (
    repair_order_id INT PRIMARY KEY AUTO_INCREMENT,
    work_order_id INT,
    part_number VARCHAR(100),
    description TEXT,
    repair_status VARCHAR(50),
    repair_start_date DATE,
    repair_end_date DATE,
    FOREIGN KEY (work_order_id) REFERENCES Maintenance.Work_Orders(work_order_id),
    FOREIGN KEY (part_number) REFERENCES Inventory.Parts(part_number)
);

CREATE TABLE IF NOT EXISTS Maintenance.Inspection_Logs (
    inspection_id INT PRIMARY KEY AUTO_INCREMENT,
    work_order_id INT,
    inspection_type VARCHAR(100),
    inspection_date DATE,
    inspector_name VARCHAR(100),
    inspection_status VARCHAR(50),
    remarks TEXT,
    FOREIGN KEY (work_order_id) REFERENCES Maintenance.Work_Orders(work_order_id)
);

-- Inventory Schema Tables
CREATE TABLE IF NOT EXISTS Inventory.Parts (
    part_number VARCHAR(100) PRIMARY KEY,
    description VARCHAR(255),
    manufacturer VARCHAR(100),
    part_type VARCHAR(50),
    unit_price DECIMAL(10, 2),
    serial_number VARCHAR(100) NULL,
    serial_number_required BOOLEAN,
    expiry_date DATE,
    certification_number VARCHAR(100),
    last_inspection_date DATE
);

CREATE TABLE IF NOT EXISTS Inventory.Inventory_Locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    warehouse_name VARCHAR(100),
    location_type VARCHAR(50),
    address TEXT
);

CREATE TABLE IF NOT EXISTS Inventory.Inventory_Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    part_number VARCHAR(100),
    location_id INT,
    transaction_type VARCHAR(50), -- Received, Used, Transferred
    quantity INT,
    transaction_date DATE,
    FOREIGN KEY (part_number) REFERENCES Inventory.Parts(part_number),
    FOREIGN KEY (location_id) REFERENCES Inventory.Inventory_Locations(location_id)
);

-- Financials Schema Tables
CREATE TABLE IF NOT EXISTS Financials.GL_Accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(255),
    account_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Financials.AP_Invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT,
    invoice_date DATE,
    total_amount DECIMAL(10, 2),
    payment_status VARCHAR(50),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

CREATE TABLE IF NOT EXISTS Financials.AR_Invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    invoice_date DATE,
    total_amount DECIMAL(10, 2),
    payment_status VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
"@

# Open MySQL connection
$connection = New-Object MySql.Data.MySqlClient.MySqlConnection($connectionString)
$connection.Open()

# Create MySQL command to execute the SQL query
$command = $connection.CreateCommand()
$command.CommandText = $sqlQuery

# Execute the SQL query
try {
    $command.ExecuteNonQuery()
    Write-Host "Schemas and tables have been created successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error executing SQL script: $_" -ForegroundColor Red
}

# Close the connection
$connection.Close()
