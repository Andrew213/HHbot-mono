import {Module} from "@nestjs/common";

import {PostsEditingController} from "./posts-editing.controller";
import {PostsEditingService} from "./posts-editing.service";

@Module({
   controllers: [PostsEditingController],
   providers: [PostsEditingService],
   exports: [PostsEditingService],
})
export class PostsEditingModule {}
