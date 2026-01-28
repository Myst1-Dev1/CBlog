import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern('comments.create')
  create(@Payload() data: CreateCommentDto) {
    return this.commentsService.createComment(data);
  }

  @MessagePattern('comments.getAll')
  getAll(@Payload() data: { postId: number }) {
    return this.commentsService.getAllComments(data.postId);
  }

  @MessagePattern('service.ping')
  ping() {
    return this.commentsService.ping();
  }
}
