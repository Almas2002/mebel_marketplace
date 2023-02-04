import { HttpException } from '@nestjs/common';

export class DecorExistsException extends HttpException {
  constructor() {
    super('декор уже существует', 409);
  }
}

export class DecorNotFoundException extends HttpException {
  constructor() {
    super('такой декор не существует', 404);
  }
}