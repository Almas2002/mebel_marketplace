import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductInfoDto {
  @ApiProperty({required:false})
  length: number;
  @ApiProperty({required:false})
  width: number;
  @ApiProperty({required:false})
  height: number;
  @ApiProperty()
  production: string;
  @ApiProperty({required:false})
  liftingMechanism: boolean;
  @ApiProperty({required:false})
  laundryBoxes: boolean;
  @IsNotEmpty()
  @ApiProperty()
  decorId: number;
  @IsNotEmpty()
  @ApiProperty()
  cityId: number;
}