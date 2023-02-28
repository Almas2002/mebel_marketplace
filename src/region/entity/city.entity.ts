import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';
import { ProductInfo } from '../../product-info/entity/product-info.entity';
import { Product } from '../../product/product.entity';
import { Market } from '../../market/market.entity';
import { Order } from '../../order/order.entity';


@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(() => Region, region => region.cities, { onDelete: 'CASCADE' })
  region: Region;

  @OneToMany(() => Product, product => product.city)
  products: Product[];

  @OneToMany(() => Market, market => market.city)
  markets: Market[];

  @OneToMany(()=>Order,order=>order.city)
  orders:Order[]
}