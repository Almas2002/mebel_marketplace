import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Image{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({name:"image_url"})
  imageUrl:string

  @ManyToOne(()=>Product,product=>product.category)
  @JoinColumn({name:"product_id"})
  product:Product
}