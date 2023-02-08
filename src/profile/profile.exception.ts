import { HttpException } from '@nestjs/common';

export class ProfileNotFoundException extends HttpException{
  constructor() {
    super("профиль у пользователя не существует",404);
  }
}