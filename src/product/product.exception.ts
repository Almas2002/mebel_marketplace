import { HttpException } from '@nestjs/common';

export class ProductNotFoundException extends HttpException{
  constructor() {
    super("такой продукт не найден",404);
  }
}