import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({unique:true})
  title:string;
  @OneToMany(()=>City,city=>city.region,{onDelete:'CASCADE'})
  cities:City[]
}