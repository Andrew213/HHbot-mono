import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {Student} from "./students/entities/student.entity";
import {StudentsModule} from "./students/students.module";

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: "postgres",
         host: "localhost",
         port: 5432,
         username: "student",
         password: "student",
         database: "nest_project",
         schema: "nest_project",
         entities: [Student],
         synchronize: true,
      }),
      StudentsModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
