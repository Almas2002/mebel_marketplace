import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { CartItem } from './cart-item.entity';

@Entity({name:'carts'})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User,user=>user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(()=>CartItem,items=>items.cart)
  cartItems:CartItem [];
}