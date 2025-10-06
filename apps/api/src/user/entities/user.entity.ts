import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Rating} from "../../raiting/raiting.entity";

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id!: number;
   @Column({type: "varchar"})
   name!: string;

   @OneToMany(() => Rating, rait => rait.points)
   raiting!: Rating[];
}
