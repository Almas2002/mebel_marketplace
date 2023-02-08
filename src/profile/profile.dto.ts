import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto{
  @ApiProperty({required:false})
  firstName:string;
  @ApiProperty({required:false})
  secondName:string;
  @ApiProperty({required:false})
  email: string;
  @ApiProperty({required:false})
  dayOfBirth: number;
  @ApiProperty({required:false})
  monthOfBirth: number;
  @ApiProperty({required:false})
  yearOfBirth: number;
}