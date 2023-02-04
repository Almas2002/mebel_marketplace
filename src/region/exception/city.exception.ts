import { HttpException, HttpStatus } from '@nestjs/common';

export class CityExistException extends HttpException{
  constructor() {
    super('такой город уже существует',HttpStatus.CONFLICT);
  }
}

export class CityNotFoundException extends HttpException{
  constructor() {
    super('такого города не существует',HttpStatus.NOT_FOUND);
  }
}