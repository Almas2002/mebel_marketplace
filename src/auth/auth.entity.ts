import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Auth{
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(()=>User,{onDelete:"CASCADE"})
  @JoinColumn()
  user: User;
  @Column()
  refresh_token: string;
}
