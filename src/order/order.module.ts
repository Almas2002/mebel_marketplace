import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMarket } from './order-market.entity';
import { Order } from './order.entity';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderMarket]),CartModule,],
  controllers:[OrderController],
  providers:[OrderService]
})
export class OrderModule{

}