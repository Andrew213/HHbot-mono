import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Rating} from "../raiting/raiting.entity";

// Свяжите таблицу с информацией о курсе с таблицей рейтинга
@Entity()
export class Course {
   @PrimaryGeneratedColumn()
   id!: number;
   @Column({type: "varchar"})
   name!: string;

   @OneToMany(() => Rating, r => r.course)
   ratings!: Rating[];
}
