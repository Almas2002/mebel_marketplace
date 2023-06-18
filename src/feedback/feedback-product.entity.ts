import { Product } from '../product/product.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeedbackProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Product, product => product,{onDelete:"CASCADE"})
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column({ type: 'float', default: 0 })
  avg: number;
  @Column({ name: 'comment_count', default: 0 })
  commentCount: number;
}