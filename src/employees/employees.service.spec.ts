import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

jest.mock('./employee.repository'); // Mock repository if required

describe('EmployeeService', () => {
  let employeeService: EmployeeService;

  beforeAll(() => {
    employeeService = new EmployeeService(); // Initialize your service
  });

  it('should create an employee', async () => {
    const newEmployee: EmployeeDto = { name: 'John Doe', email: 'john.doe@example.com' };
    const createdEmployee: Employee = { id: 1, ...newEmployee };

    jest.spyOn(employeeService, 'create').mockResolvedValue(createdEmployee);

    const result = await employeeService.create(newEmployee);
    expect(result).toEqual(createdEmployee);
    expect(result.name).toBe(newEmployee.name);
    expect(result.email).toBe(newEmployee.email);
  });

  it('should update an employee', async () => {
    const updatedEmployee: EmployeeDto = { name: 'John Doe Updated', email: 'john.doe.updated@example.com' };
    const employeeId = 1;
    const updatedResult: Employee = { id: employeeId, ...updatedEmployee };

    jest.spyOn(employeeService, 'update').mockResolvedValue(updatedResult);

    const result = await employeeService.update(employeeId, updatedEmployee);
    expect(result.id).toBe(employeeId);
    expect(result.name).toBe(updatedEmployee.name);
  });

  it('should delete an employee', async () => {
    const employeeId = 1;
    jest.spyOn(employeeService, 'remove').mockResolvedValue(undefined);

    await expect(employeeService.remove(employeeId)).resolves.toBeUndefined();
  });

  it('should throw an error if employee does not exist', async () => {
    const employeeId = 999;  // Non-existing employee ID
    jest.spyOn(employeeService, 'findOne').mockResolvedValue(null);

    await expect(employeeService.findOne(employeeId)).rejects.toThrow('Employee not found');
  });
});
