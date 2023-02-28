import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderMarket } from './order-market.entity';
import { City } from '../region/entity/city.entity';
import { Cart } from '../cart/entity/cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderMarket, order => order.order)
  markets: OrderMarket [];

  @Column()
  apartment: string;
  @Column()
  building: string;
  @Column()
  address: string;
  @ManyToOne(() => City, city => city.orders)
  city: City;
  @Column()
  phone: string;

  @OneToMany(() => OrderMarket, market => market.order)
  marketOrders: OrderMarket[];

  @ManyToOne(() => Cart, cart => cart.orders)
  cart: Cart;

  @Column({ default: 0, type: 'float' })
  totalPrice: number;
}