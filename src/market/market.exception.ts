import { HttpException } from '@nestjs/common';

export class MarketExistException extends HttpException{
  constructor() {
    super("магазин с таким именем уже существует",400);
  }
}
export class MarketNotFoundException extends HttpException{
  constructor() {
    super("у вас нет магазина",404);
  }
}