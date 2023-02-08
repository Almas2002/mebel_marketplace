import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags("profile")
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Put()
  update(@Body()dto: CreateProfileDto, @UserDecorator('id')id: number) {
    return this.profileService.update(dto, id);
  }
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Get('/me')
  getProfile(@UserDecorator('id')id: number) {
    return this.profileService.get(id);
  }
}