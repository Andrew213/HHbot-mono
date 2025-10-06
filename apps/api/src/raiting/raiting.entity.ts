import {Max, Min} from "class-validator";
import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
} from "typeorm";

import {Course} from "../course/courses.entity";
import {User} from "../user/entities/user.entity";

@Entity()
export class Rating {
   @PrimaryGeneratedColumn()
   id!: number;
   @Column({type: "int"})
   @Min(1)
   @Max(1)
   points!: number;

   @ManyToOne(() => User, user => user.id)
   @JoinColumn({name: "user_id"})
   user!: User;

   @ManyToOne(() => Course, course => course.id)
   @JoinColumn({name: "course_id"})
   course!: Course;
}
