import { HttpException } from '@nestjs/common';

export class ColorNotFoundException extends HttpException{
  constructor() {
    super("такой цвет не найден",404);
  }
}

export class ColorExistException extends HttpException{
  constructor() {
    super("такой цвет уже существует",409);
  }
}