import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCartItemDto{
   carts:CartItemDto[]
}

export class CartItemDto{
  @ApiProperty()
  @IsNotEmpty()
  qty:number;
  @ApiProperty()
  @IsNotEmpty()
  productId:number

  @ApiProperty()
  @IsNotEmpty()
  totalPrice:number
}