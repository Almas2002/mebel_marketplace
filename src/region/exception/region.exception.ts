import { HttpException, HttpStatus } from '@nestjs/common';

export class RegionExistException extends HttpException{
  constructor() {
    super('такая область уже есть',HttpStatus.CONFLICT);
  }
}
export class RegionNotFoundException extends HttpException{
  constructor() {
    super('такая область не существует',HttpStatus.NOT_FOUND);
  }
}