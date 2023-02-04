import { CreateProductInfoDto } from '../product-info/dto/product-info.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDto extends CreateProductInfoDto {
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @ApiProperty({ required: false })
  discount: number;
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  marketId: number;
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  colors: number[];
  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  frames: number[];
}

export class GetProductListQuery{
  limit:number;
  page:number;
  colors: string;
  categoryId:number;
  parentCategoryId:number;
  cityId:number;
  priceFrom:number;
  priceTo:number;
  discount:boolean;
  photo:boolean;
}