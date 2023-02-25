import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { CartService } from './service/cart.service';
import { CartItemService } from './service/cart-item.service';
import { ProductModule } from '../product/product.module';
import { CartController } from './cart.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,CartItem]),ProductModule],
  controllers:[CartController],
  providers:[CartService,CartItemService],
  exports:[CartService]
})
export class CartModule{}