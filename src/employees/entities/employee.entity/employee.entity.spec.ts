import { Employee } from './employee.entity'; // Adjust to your actual path

describe('Employee Entity', () => {
  it('should create a new employee entity', () => {
    const employee = new Employee();
    employee.id = 1;
    employee.name = 'John Doe';
    employee.email = 'john.doe@example.com';
    employee.position = 'Software Engineer'; // Assuming a 'position' field exists
    employee.dateOfHire = new Date('2025-01-01'); // Assuming a 'dateOfHire' field exists

    // Ensure the object is defined
    expect(employee).toBeDefined();

    // Check if the employee has the correct properties
    expect(employee.id).toBe(1);
    expect(employee.name).toBe('John Doe');
    expect(employee.email).toBe('john.doe@example.com');
    expect(employee.position).toBe('Software Engineer'); // Check position
    expect(employee.dateOfHire).toEqual(new Date('2025-01-01')); // Check hire date

    // Optionally, test other methods or validation logic in the Employee entity
  });
});
