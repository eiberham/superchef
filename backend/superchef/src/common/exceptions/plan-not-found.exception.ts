import { HttpException, HttpStatus } from '@nestjs/common';

export class PlanNotFoundException extends HttpException {
  constructor() {
    super('Plan not found', HttpStatus.NOT_FOUND);
  }
}
