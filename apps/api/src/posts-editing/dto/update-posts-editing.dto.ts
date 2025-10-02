import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsEditingDto } from './create-posts-editing.dto';

export class UpdatePostsEditingDto extends PartialType(CreatePostsEditingDto) {}