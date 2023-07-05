import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sms {
  @PrimaryGeneratedColumn()
  id:number
  @Column({nullable:true})
  phone?:string;
  @Column({nullable:true})
  email?:string;
  @Column()
  code:number
}