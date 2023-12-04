import { Controller, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}


  @Delete()
  @UseGuards(AuthGuard)
  async delete(@UserDecorator('id')id: number) {
    await this.userService.deleteUser(id);
  }
}