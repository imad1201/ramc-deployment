export class CreateLeaveDto {
  readonly employeeId: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly reason?: string;
}
