import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique:true})
  title: string;

  @Column()
  icon: string;

  @ManyToOne(()=>Category,category=>category.categories,{onDelete:"CASCADE"})
  parent:Category

  @OneToMany(()=>Category,category=>category.parent,{onDelete:"CASCADE"})
  categories:Category[]

  @OneToMany(()=>Product,product=>product.category,{onDelete:"CASCADE"})
  products:Product[]
}