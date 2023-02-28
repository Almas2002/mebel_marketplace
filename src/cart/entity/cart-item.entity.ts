import { Product } from '../../product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from '../../order/order.entity';
import { OrderMarket } from '../../order/order-market.entity';

@Entity()
export class CartItem{
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>Product,product=>product.cariItems,)
  @JoinColumn({name:"product_id"})
  product:Product

  @Column()
  qty:number;

  @Column({type:"float",default:0})
  totalPrice:number

  @ManyToOne(()=>Cart,cart=>cart.cartItems)
  @JoinColumn({name:"cart_id"})
  cart:Cart;

  @ManyToOne(()=>OrderMarket,order=>order.items,{nullable:true,onDelete:"CASCADE"})
  @JoinColumn({name:"order_id"})
  orderMarket:OrderMarket;
}