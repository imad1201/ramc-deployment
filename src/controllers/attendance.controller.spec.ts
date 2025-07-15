import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('AttendanceController', () => {
  let controller: AttendanceController;
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [
        {
          provide: AttendanceService,
          useValue: createMock<AttendanceService>(), // Mock the service
        },
      ],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should get all attendance records', async () => {
    const result = [{ id: 1, date: '2021-10-01', status: 'Present' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should create attendance record', async () => {
    const createDto = { date: '2021-10-02', status: 'Absent' };
    const result = { id: 2, ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createDto)).toEqual(result);
  });

  it('should throw error if create fails', async () => {
    const createDto = { date: '2021-10-02', status: 'Absent' };
    jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create attendance'));

    try {
      await controller.create(createDto);
    } catch (e) {
      expect(e.response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(e.response.message).toBe('Failed to create attendance');
    }
  });
});
