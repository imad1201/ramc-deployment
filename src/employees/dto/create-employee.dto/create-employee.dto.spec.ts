import { CreateEmployeeDto } from './create-employee.dto';
import { validate } from 'class-validator';

describe('CreateEmployeeDto', () => {
  it('should validate employee creation data', async () => {
    const validDto = new CreateEmployeeDto();
    validDto.name = 'John Doe';
    validDto.email = 'john.doe@example.com';

    const errors = await validate(validDto);
    expect(errors.length).toBe(0); // Should not have any validation errors

    const invalidDto = new CreateEmployeeDto();
    invalidDto.name = ''; // Invalid name
    invalidDto.email = 'not-an-email'; // Invalid email

    const errorsInvalid = await validate(invalidDto);
    expect(errorsInvalid.length).toBeGreaterThan(0); // Should have validation errors
  });
});
