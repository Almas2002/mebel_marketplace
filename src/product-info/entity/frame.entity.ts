import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInfo } from './product-info.entity';

@Entity()
export class Frame{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({unique:true})
  title:string;

  @ManyToMany(()=>ProductInfo,product=>product.frames)
  productInfos:ProductInfo[]
}