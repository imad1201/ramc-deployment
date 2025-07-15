const { getEmployee } = require('../backend/controllers/employeeController'); // Adjust this path as needed
const db = require('../backend/config/db'); // Your DB connection for testing

describe('Employee Controller', () => {
  it('should return all employees', async () => {
    const response = await getEmployee();
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0); // Ensure there is at least one employee in your db
  });
});
