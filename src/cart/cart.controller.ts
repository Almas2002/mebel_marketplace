import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartItemService } from './service/cart-item.service';
import { CartItemDto } from './cart.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartItemService) {
  }


  @UseGuards(AuthGuard)
  @Post()
  createCartItem(@Body()dto: CartItemDto, @UserDecorator('id')id: number) {
    return this.cartService.create(dto, id);
  }

  @Put('plus/:id')
  plusItem(@Param('id')id: number) {
    return this.cartService.plusQtyCartItem(id);
  }

  @Put('mince/:id')
  minceItem(@Param('id')id: number) {
    return this.cartService.minceQryCartItem(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getItems(@UserDecorator('id')id: number) {
    return this.cartService.getCartItemsFotCart(id);
  }

  @Delete('/:id')
  deleteItem(@Param('id')id: number) {
    return this.cartService.deleteCartItem(id);
  }
}