require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Correct import

const app = express();

// MySQL Connection Pool Setup
const createPool = () => {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ramc_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

let pool;

// Database Connection Middleware
const connectDB = async () => {
  try {
    pool = createPool();
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./backend/routes/userRoutes');
const employeeRoutes = require('./backend/routes/employeeRoutes');
const attendanceRoutes = require('./backend/routes/attendanceRoutes');
const payrollRoutes = require('./backend/routes/payrollRoutes');
const leaveRoutes = require('./backend/routes/leaveRoutes');

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/leave_requests', leaveRoutes);

// Test endpoint with DB check
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.send(`Welcome to RAMC HRMC. DB test result: ${rows[0].result}`);
  } catch (error) {
    res.status(500).send('Welcome to RAMC HRMC (DB connection failed)');
  }
});

// Chunk Processing Function
const processChunks = async () => {
  try {
    const largeArray = new Array(1000000).fill('data');
    const chunkSize = 10000;
    
    console.log('Starting chunk processing...');
    
    for (let i = 0; i < largeArray.length; i += chunkSize) {
      const chunk = largeArray.slice(i, i + chunkSize);
      await processChunk(chunk, i);
    }
    
    console.log('✅ Finished processing chunks');
  } catch (error) {
    console.error('❌ Chunk processing failed:', error);
  }
};

// Individual Chunk Processor
const processChunk = async (chunk, index) => {
  try {
    // Example: Insert chunk into database
    await pool.query(
      'INSERT INTO test_data (content) VALUES ?',
      [chunk.map(item => [item])]
    );
    console.log(`Processed chunk ${index / 10000 + 1}`);
  } catch (error) {
    console.error(`Error processing chunk ${index / 10000 + 1}:`, error);
    throw error;
  }
};

// Server Startup
const startServer = async () => {
  try {
    await connectDB();
    
    // Create test table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
      console.log(`🚀 Server running on port ${PORT}`);
      
      // Start chunk processing after server starts
      await processChunks();
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();

// Error handling for uncaught exceptions
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});