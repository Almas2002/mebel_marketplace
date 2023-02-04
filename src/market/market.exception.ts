import { HttpException } from '@nestjs/common';

export class MarketExistException extends HttpException{
  constructor() {
    super("магазин с таким именем уже существует",400);
  }
}