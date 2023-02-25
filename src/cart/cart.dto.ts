import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CartItemDto{
  @ApiProperty()
  @IsNotEmpty()
  qty:number;
  @ApiProperty()
  @IsNotEmpty()
  productId:number


}

export class PlusQtyItem {
  id:number;
}