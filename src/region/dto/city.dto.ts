import { CreateRegionDto } from './region.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCityDto extends CreateRegionDto{
  @ApiProperty({description:"айди области",example:1})
  @IsInt()
  @IsNotEmpty()
  regionId:number
}