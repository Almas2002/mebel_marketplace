import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto{
    @ApiProperty({example:"Туркыстанская обаласть",description:"название области"})
    @IsString()
    @IsNotEmpty()
    title:string
}