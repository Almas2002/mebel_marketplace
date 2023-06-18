import { User } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Market } from '../market/market.entity';
import { FeedbackComment } from '../feedback/feedback-comment.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.profile,{onDelete:"CASCADE"})
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'second_name' })
  secondName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true, name: 'day_of_birth' })
  dayOfBirth: number;

  @Column({ nullable: true, name: 'month_of_birth' })
  monthOfBirth: number;

  @Column({ nullable: true, name: 'year_of_birth' })
  yearOfBirth: number;

  @ManyToMany(()=>Product,product=>product,{onDelete:"CASCADE"})
  favorites:Product[]

}