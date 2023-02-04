import { Product } from '../product/product.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(()=>Product,product=>product)
  @JoinColumn({name:"product_id"})
  product:Product

  @Column()
  qty:number;

  order:null;
}