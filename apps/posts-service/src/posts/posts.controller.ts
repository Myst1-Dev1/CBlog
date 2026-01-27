import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';
import { UpdatePostDto } from './dto/updatePostDto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern('posts.create')
  create(@Payload() data: CreatePostDto) {
    return this.postsService.createNewPost(data);
  }

  @MessagePattern('posts.findAll')
  findAll() {
    return this.postsService.getAllPosts();
  }

  @MessagePattern('posts.findById')
  findById(@Payload() data: { id: number }) {
    return this.postsService.getPostById(data.id);
  }

  @MessagePattern('posts.update')
  update(@Payload() data: { id: number; update: UpdatePostDto }) {
    return this.postsService.updatePost(data.id, data.update);
  }

  @MessagePattern('posts.delete')
  delete(@Payload() data: { id: number }) {
    return this.postsService.deletePost(data.id);
  }

  @MessagePattern('service.ping')
  ping() {
    return this.postsService.ping();
  }
}
