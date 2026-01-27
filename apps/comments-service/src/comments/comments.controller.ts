import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern('comment.created')
  create(@Payload() data: CreateCommentDto) {
    return this.commentsService.createComment(data);
  }

  @MessagePattern('service.ping')
  ping() {
    return this.commentsService.ping();
  }
}
