import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderMarketQuery, OrderQuery } from './order.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { StatusOfOrder } from './order-market.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {
  }


  @UseGuards(AuthGuard)
  @Post()
  create(@Body()dto: CreateOrderDto, @UserDecorator('id')id: number) {
    return this.orderService.createOrder(dto, id);
  }
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @UseGuards(AuthGuard)
  @Get()
  listOrders(@Query()dto: OrderQuery, @UserDecorator('id')id: number) {
    return this.orderService.getOrder(dto, id);
  }

  @Get('/one/:id')
  orderOne(@Param('id')id: number) {
    return this.orderService.getOrderById(id);
  }
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'status', example: 'CREATED', required: false,type:'enum',enum:StatusOfOrder })
  @UseGuards(AuthGuard)
  @Get('/market')
  orderMarket(@Query()query:OrderMarketQuery,@UserDecorator('id')id: number) {
    return this.orderService.getOrdersToMarket(query,id);
  }

}