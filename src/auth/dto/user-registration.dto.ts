import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class UserRegistrationDto extends UserLoginDto{
}