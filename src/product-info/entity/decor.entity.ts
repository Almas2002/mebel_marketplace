import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Color } from './color.entity';
import { ProductInfo } from './product-info.entity';

@Entity()
export class Decor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;

  @OneToMany(() => ProductInfo, product => product)
  productInfos: ProductInfo[];
}