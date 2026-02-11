import { HttpException, HttpStatus } from '@nestjs/common';

export class RecipeNotFoundException extends HttpException {
  constructor() {
    super('Recipe not found', HttpStatus.NOT_FOUND);
  }
}
