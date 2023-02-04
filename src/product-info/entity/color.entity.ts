import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/product.entity';

@Entity()
export class Color{
  @PrimaryGeneratedColumn()
  id:number
  @Column({unique:true})
  title:string;
  @Column()
  value:string;

  @ManyToMany(()=>Product,product=>product.colors)
  @JoinTable({name:"product_colors"})
  products:Product[]
}