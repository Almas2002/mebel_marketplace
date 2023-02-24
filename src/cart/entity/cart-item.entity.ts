import { Product } from '../../product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(()=>Product,product=>product)
  @JoinColumn({name:"product_id"})
  product:Product

  @Column()
  qty:number;
  @ManyToOne(()=>Cart,cart=>cart.cartItems)
  @JoinColumn({name:"cart_id"})
  cart:Cart;
  order:null;
}