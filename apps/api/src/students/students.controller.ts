import {Controller, Get} from "@nestjs/common";

import {Student} from "./entities/student.entity";
import {StudentsService} from "./students.service";

@Controller("students")
export class StudentsController {
   constructor(private readonly studentsService: StudentsService) {
      console.log("StudentsService is", !!studentsService);
   }

   @Get()
   findAll(): Promise<Student[]> {
      console.log(this.studentsService);
      return this.studentsService.findAll();
   }
}
