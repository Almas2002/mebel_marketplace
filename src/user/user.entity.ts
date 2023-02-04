import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Market } from '../market/market.entity';
import { FeedbackComment } from '../feedback/feedback-comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  phone: string;
  @Column()
  password: string;
  @ManyToMany(() => Role, role => role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToOne(() => Market, market => market.user)
  market: Market;

  @OneToMany(()=>FeedbackComment,feedback=>feedback.user,{onDelete:"SET NULL"})
  feedbacks: FeedbackComment[];
}