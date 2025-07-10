CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  role ENUM('Admin','Supervisor','Technician') DEFAULT 'Technician',
  password VARCHAR(255),
  division VARCHAR(100),
  station VARCHAR(100),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE WorkOrders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  woNumber VARCHAR(50) UNIQUE,
  aircraftReg VARCHAR(50),
  station VARCHAR(50),
  scheduledStart DATETIME,
  scheduledEnd DATETIME,
  status ENUM('Open','In Progress','Closed') DEFAULT 'Open'
);

CREATE TABLE Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  woNumber VARCHAR(50),
  taskNumber VARCHAR(50),
  description TEXT,
  skillRequired VARCHAR(50),
  estimatedHours DECIMAL(5,2),
  sequence INT,
  status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
  FOREIGN KEY (woNumber) REFERENCES WorkOrders(woNumber)
);
