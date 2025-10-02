import {Injectable} from "@nestjs/common";

import {CreatePostsEditingDto} from "./dto/create-posts-editing.dto";
import {UpdatePostsEditingDto} from "./dto/update-posts-editing.dto";

@Injectable()
export class PostsEditingService {
   create(createPostsEditingDto: CreatePostsEditingDto) {
      return "This action adds a new postsEditing";
   }

   findAll() {
      return `This action returns all postsEditing`;
   }

   findOne(id: number) {
      return `This action returns a #${id} postsEditing`;
   }

   update(id: number, updatePostsEditingDto: UpdatePostsEditingDto) {
      return `This action updates a #${id} postsEditing`;
   }

   remove(id: number) {
      return `This action removes a #${id} postsEditing`;
   }
}
