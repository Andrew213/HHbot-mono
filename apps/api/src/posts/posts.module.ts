import {Module} from "@nestjs/common";

import {ConfigModule} from "../config/config.module";
import {PostsEditingModule} from "../posts-editing/posts-editing.module";
import {PostsController} from "./posts.controller";
import {PostsService} from "./posts.service";

@Module({
   imports: [ConfigModule, PostsEditingModule],
   controllers: [PostsController],
   providers: [PostsService],
})
export class PostsModule {}
