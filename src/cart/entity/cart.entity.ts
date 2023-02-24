import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ default: 0 })
  totalPrice: number;


  @OneToMany(()=>CartItem,items=>items.cart)
  cartItems:CartItem []
}