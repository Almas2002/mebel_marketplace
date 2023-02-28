import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Market } from '../market/market.entity';
import { Order } from './order.entity';
import { CartItem } from '../cart/entity/cart-item.entity';

export enum StatusOfOrder {
  CREATED = 'CREATED',
  PAYMENT = 'PAYMENT',
  DELIVERY = 'DELIVERY',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
  ERROR = 'ERROR',
}

@Entity()
export class OrderMarket {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Market, market => market.orders)
  market: Market;

  @ManyToOne(() => Order, order => order.markets)
  order: Order;
  @Column({ default: 0, type: 'float' })
  totalPrice: number;
  @Column({
    type: 'enum',
    enum: StatusOfOrder,
    default: 'CREATED',
  })
  status: StatusOfOrder;
  @OneToMany(() => CartItem, cart => cart.orderMarket)
  items: CartItem[];


}