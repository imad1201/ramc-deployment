# Set base directory for your project
$baseDir = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment"

# Set directory paths for backend and config
$backendDir = "$baseDir\backend"
$configDir = "$backendDir\config"
$routesDir = "$backendDir\routes"

# Check if 'backend' directory exists, if not, create it
if (-not (Test-Path -Path $backendDir)) {
    Write-Host "Creating 'backend' directory..."
    New-Item -Path $backendDir -ItemType Directory
} else {
    Write-Host "'backend' directory already exists."
}

# Check if 'config' directory exists, if not, create it
if (-not (Test-Path -Path $configDir)) {
    Write-Host "Creating 'config' directory..."
    New-Item -Path $configDir -ItemType Directory
} else {
    Write-Host "'config' directory already exists."
}

# Check if db.js file exists, if not, create it with default content
$dbFilePath = "$configDir\db.js"
if (-not (Test-Path -Path $dbFilePath)) {
    Write-Host "Creating 'db.js' file in 'config' directory..."
    $dbContent = @"
const mysql = require('mysql2');

// Set up connection with your database credentials
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to database.');
});

module.exports = connection;
"@
    $dbContent | Set-Content -Path $dbFilePath
    Write-Host "'db.js' file has been created in the 'config' directory."
} else {
    Write-Host "'db.js' file already exists."
}

# Check if 'routes' directory exists, if not, create it
if (-not (Test-Path -Path $routesDir)) {
    Write-Host "Creating 'routes' directory..."
    New-Item -Path $routesDir -ItemType Directory
} else {
    Write-Host "'routes' directory already exists."
}

# Check if 'userRoutes.js' file exists, if not, create it with default content
$userRoutesFilePath = "$routesDir\userRoutes.js"
if (-not (Test-Path -Path $userRoutesFilePath)) {
    Write-Host "Creating 'userRoutes.js' file in 'routes' directory..."
    $userRoutesContent = @"
const express = require('express');
const router = express.Router();

// Placeholder for user routes
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.post('/', (req, res) => {
    res.send('Create new user');
});

module.exports = router;
"@
    $userRoutesContent | Set-Content -Path $userRoutesFilePath
    Write-Host "'userRoutes.js' file has been created in the 'routes' directory."
} else {
    Write-Host "'userRoutes.js' file already exists."
}

# Check if server.js file exists at the root, if not, create it with default content
$serverFilePath = "$baseDir\server.js"
if (-not (Test-Path -Path $serverFilePath)) {
    Write-Host "Creating 'server.js' file at the root directory..."
    $serverContent = @"
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Log the path to the db.js file
console.log('Full path to db.js:', path.resolve(__dirname, './backend/config/db.js'));

// Test the path for loading db module
console.log('Loading db module...');
const db = require('./backend/config/db');  // Ensure the path is correct
console.log('db module loaded!');

const userRoutes = require('./backend/routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('RAMC ERP API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
"@
    $serverContent | Set-Content -Path $serverFilePath
    Write-Host "'server.js' file has been created at the root directory."
} else {
    Write-Host "'server.js' file already exists."
}

Write-Host "Script execution completed."
