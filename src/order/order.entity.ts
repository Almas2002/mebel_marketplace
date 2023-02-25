import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from '../cart/entity/cart-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(()=>CartItem,cart=>cart)
  items:CartItem[]
}