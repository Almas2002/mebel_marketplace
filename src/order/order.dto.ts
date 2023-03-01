import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusOfOrder } from './order-market.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Город' })
  cityId: number;
  @IsNotEmpty()
  @ApiProperty({ example: '42', description: 'офис или квартира' })
  apartment: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Жанаталап', description: 'ройон или местность' })
  building: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Койбагар', description: 'Улица' })
  address: string;
  @IsNotEmpty()
  @ApiProperty({ example: '87075545401', description: 'телефон номер заказщика' })
  phone: string;
}

export class OrderQuery {
  limit: number;
  page: number;
}

export class OrderMarketQuery extends OrderQuery{
  status: StatusOfOrder
}

export class OrderMarketUpdate {
  @ApiProperty({ example: StatusOfOrder.CREATED, description: 'status',enum:StatusOfOrder})
  @IsEnum(StatusOfOrder)
  status: StatusOfOrder
}