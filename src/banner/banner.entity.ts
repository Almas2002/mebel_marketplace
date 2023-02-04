import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banner{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({name:"image_url"})
  imageUrl:string;

  @Column()
  title:string;

  @Column()
  description:string
}