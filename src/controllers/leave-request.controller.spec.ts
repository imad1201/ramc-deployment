import { LeaveRequestController } from './leave-request.controller';
import { LeaveRequestService } from './leave-request.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('LeaveRequestController', () => {
  let controller: LeaveRequestController;
  let service: LeaveRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveRequestController],
      providers: [
        {
          provide: LeaveRequestService,
          useValue: createMock<LeaveRequestService>(), // Mock the service
        },
      ],
    }).compile();

    controller = module.get<LeaveRequestController>(LeaveRequestController);
    service = module.get<LeaveRequestService>(LeaveRequestService);
  });

  it('should create a new leave request', async () => {
    const createDto = { employeeId: 1, startDate: '2021-12-01', endDate: '2021-12-05' };
    const result = { id: 1, ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createDto)).toEqual(result);
  });

  it('should return all leave requests', async () => {
    const result = [{ id: 1, employeeId: 1, startDate: '2021-12-01', endDate: '2021-12-05' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should throw error if leave request fails', async () => {
    const createDto = { employeeId: 1, startDate: '2021-12-01', endDate: '2021-12-05' };
    jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create leave request'));

    try {
      await controller.create(createDto);
    } catch (e) {
      expect(e.response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(e.response.message).toBe('Failed to create leave request');
    }
  });
});
