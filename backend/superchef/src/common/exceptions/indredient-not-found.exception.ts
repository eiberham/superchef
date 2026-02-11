import { HttpException, HttpStatus } from '@nestjs/common';

export class IngredientNotFoundException extends HttpException {
  constructor() {
    super('Ingredient not found', HttpStatus.NOT_FOUND);
  }
}
