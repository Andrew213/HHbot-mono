import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
} from "@nestjs/common";

import {CreatePostsEditingDto} from "./dto/create-posts-editing.dto";
import {UpdatePostsEditingDto} from "./dto/update-posts-editing.dto";
import {PostsEditingService} from "./posts-editing.service";

@Controller("posts-editing")
export class PostsEditingController {
   constructor(private readonly postsEditingService: PostsEditingService) {}

   @Post()
   create(@Body() createPostsEditingDto: CreatePostsEditingDto) {
      return this.postsEditingService.create(createPostsEditingDto);
   }

   @Get()
   findAll() {
      return this.postsEditingService.findAll();
   }

   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.postsEditingService.findOne(+id);
   }

   @Patch(":id")
   update(
      @Param("id") id: string,
      @Body() updatePostsEditingDto: UpdatePostsEditingDto,
   ) {
      return this.postsEditingService.update(+id, updatePostsEditingDto);
   }

   @Delete(":id")
   remove(@Param("id") id: string) {
      return this.postsEditingService.remove(+id);
   }
}
