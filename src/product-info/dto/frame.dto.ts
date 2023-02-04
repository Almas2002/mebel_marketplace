import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFrameDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title:string
}