import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Student} from "./entities/student.entity";

@Injectable()
export class StudentsService {
   constructor(
      @InjectRepository(Student)
      private readonly studentRepository: Repository<Student>,
   ) {}

   findAll(): Promise<Student[]> {
      return this.studentRepository.find();
   }

   create(student: Student): Promise<Student> {
      return this.studentRepository.save(student);
   }
}
