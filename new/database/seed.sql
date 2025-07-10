INSERT INTO Users (name, email, role, password, division, station)
VALUES
('Admin User', 'admin@ramc.aero', 'Admin', 'TempPass123!', 'Line Maintenance', 'DXB'),
('Supervisor User', 'supervisor@ramc.aero', 'Supervisor', 'TempPass123!', 'Line Maintenance', 'DXB'),
('Technician User', 'technician@ramc.aero', 'Technician', 'TempPass123!', 'Line Maintenance', 'DXB');

INSERT INTO WorkOrders (woNumber, aircraftReg, station, scheduledStart, scheduledEnd, status)
VALUES
('WO001', 'A6-ABC', 'DXB', NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), 'Open');

INSERT INTO Tasks (woNumber, taskNumber, description, skillRequired, estimatedHours, sequence, status)
VALUES
('WO001', 'TASK001', 'Check oil level', 'Mechanic', 0.50, 1, 'Pending'),
('WO001', 'TASK002', 'Inspect fan blades', 'Inspector', 1.00, 2, 'Pending');
