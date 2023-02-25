import { Product } from '../../product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from '../../order/order.entity';

@Entity()
export class CartItem{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(()=>Product,product=>product)
  @JoinColumn({name:"product_id"})
  product:Product

  @Column()
  qty:number;

  @Column()
  totalPrice:number

  @ManyToOne(()=>Cart,cart=>cart.cartItems)
  @JoinColumn({name:"cart_id"})
  cart:Cart;
  @ManyToOne(()=>Order,order=>order)
  @JoinColumn({name:"order_id"})
  order:Order;
}