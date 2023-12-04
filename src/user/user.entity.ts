import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Market } from '../market/market.entity';
import { FeedbackComment } from '../feedback/feedback-comment.entity';
import { Profile } from '../profile/profile.entity';
import { Cart } from '../cart/entity/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  phone: string;
  @Column({select:false})
  password: string;
  @ManyToMany(() => Role, role => role,{onDelete:'CASCADE'})
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToOne(()=>Profile,profile=>profile.user,{onDelete:'CASCADE'})
  profile:Profile
  @OneToOne(() => Market, market => market.user,{onDelete:'CASCADE'})
  market: Market;

  @OneToMany(()=>FeedbackComment,feedback=>feedback.user,{onDelete:"SET NULL"})
  feedbacks: FeedbackComment[];

  @OneToOne(()=>Cart,cart=>cart.user,{onDelete:'CASCADE'})
  cart:Cart;
}