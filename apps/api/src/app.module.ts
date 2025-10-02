// import {Module} from "@nestjs/common";

// import {HealthController} from "./health.controller";

// @Module({
//    controllers: [HealthController],
// })
// export class AppModule {}

import {Module} from "@nestjs/common";
import {DevtoolsModule} from "@nestjs/devtools-integration";

import {ConfigModule} from "./config/config.module";
import {PostsModule} from "./posts/posts.module";
import {PostsEditingModule} from "./posts-editing/posts-editing.module";
import {UsersModule} from "./user/users.module";

@Module({
   imports: [
      DevtoolsModule.register({http: true, port: 8000}),
      ConfigModule,
      UsersModule,
      PostsModule,
      PostsEditingModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
