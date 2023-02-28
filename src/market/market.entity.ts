import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Profile } from '../profile/profile.entity';
import { City } from '../region/entity/city.entity';
import { OrderMarket } from '../order/order-market.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  street: string;

  @ManyToOne(()=>City,city=>city)
  city: City;

  @Column()
  phone: string;

  @Column({name:"image_url"})
  imageUrl:string

  @Column({nullable:true})
  email?:string;


  @OneToMany(() => Product, product => product.market,{onDelete:"CASCADE"})
  products: Product[];

  @OneToOne(()=>User,user=>user.market)
  @JoinColumn({name:"user_id"})
  user:User


  @OneToMany(()=>OrderMarket,order=>order.market)
  orders :OrderMarket[]
}