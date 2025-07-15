import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from './utils/databaseConnection';
import attendanceRoutes from './routes/attendance';
import employeeRoutes from './routes/employees';
import payrollRoutes from './routes/payroll';
import leaveRoutes from './routes/leave-requests';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Database connection
  await createConnection();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/api/attendance', attendanceRoutes);
  app.use('/api/employees', employeeRoutes);
  app.use('/api/payroll', payrollRoutes);
  app.use('/api/leave-requests', leaveRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});