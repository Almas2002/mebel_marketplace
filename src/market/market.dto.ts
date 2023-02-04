import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMarketDto{
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  street: string;
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  @ApiProperty({required:false})
  email?:string;
  @ApiProperty()
  @IsNotEmpty()
  cityId:number;
}

export class QueryMarket {
  limit:number;
  page:number;
  userId:number;
  title:string;
}

export class UpdateMarketDto{
  @ApiProperty()
  title: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({required:false})
  email?:string;
}