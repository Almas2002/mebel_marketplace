import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../../region/entity/city.entity';
import { Color } from './color.entity';
import { Frame } from './frame.entity';
import { Decor } from './decor.entity';
import { Product } from '../../product/product.entity';

@Entity()
export class ProductInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column()
  production: string;

  @Column()
  liftingMechanism: boolean;

  @Column()
  laundryBoxes: boolean;

  @OneToOne(() => Product, product => product.info,{onDelete:"CASCADE"})
  @JoinColumn({ name: 'product_id' })
  product: Product;


  @ManyToOne(() => Decor, decor => decor.productInfos,{onDelete:"CASCADE"})
  decor: Decor;

  @ManyToMany(() => Frame, frame => frame.productInfos,{onDelete:"CASCADE"})
  @JoinTable({ name: 'product_info_frames' })
  frames: Frame[];
}