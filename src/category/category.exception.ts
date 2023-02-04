import { HttpException } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException{
  constructor() {
    super("категорий не найден",404);
  }
}

export class CategoryExistException extends HttpException{
  constructor() {
    super("такая категория уже есть",400);
  }
}