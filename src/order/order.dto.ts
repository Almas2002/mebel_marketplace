import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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