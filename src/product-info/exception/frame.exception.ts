import { HttpException } from '@nestjs/common';

export class FrameExistException extends HttpException{
  constructor() {
    super("такой каркас уже существует",409);
  }
}

export class FrameNotFoundException extends HttpException{
  constructor() {
    super("такой каркас не существует",404);
  }
}