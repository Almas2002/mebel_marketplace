import { Body, Controller, Get, Param, Post, Put, Query, Redirect, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderMarketQuery, OrderMarketUpdate, OrderQuery } from './order.dto';
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

  @Post('/success/:id')
  @Redirect('https://loom.kz', 302)
  async success(@Param('id')id: number) {
    await this.orderService.success(id);

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
  @ApiQuery({ name: 'status', example: 'CREATED', required: false, type: 'enum', enum: StatusOfOrder })
  @UseGuards(AuthGuard)
  @Get('/market')
  orderMarket(@Query()query: OrderMarketQuery, @UserDecorator('id')id: number) {
    return this.orderService.getOrdersToMarket(query, id);
  }

  @Get('/market/item/:id')
  orderMarketOne(@Param('id')id: number) {
    return this.orderService.getOrdersToMarketOne(id);
  }

  @Put('/market/item/:id')
  orderMarketUpdate(@Body()dto: OrderMarketUpdate, @Param('id')id: number) {
    return this.orderService.getOrdersMarketUpdate(id, dto.status);
  }

}