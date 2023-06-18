import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class FeedbackComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, profile => profile.feedbacks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, product => product,{onDelete:"CASCADE"})
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  comment: string;

  @Column({type:"float"})
  star: number;
}