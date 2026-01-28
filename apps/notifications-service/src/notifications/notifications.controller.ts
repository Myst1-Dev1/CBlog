import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('comment.created')
  async onCommentCreated(
    @Payload()
    data: {
      postAuthorId: number;
      commenterName: string;
      postId: number;
      commentId: number;
    },
  ) {
    return this.notificationsService.create({
      userId: data.postAuthorId,
      type: 'COMMENT',
      message: `${data.commenterName} comentou no seu post`,
      metadata: {
        postId: data.postId,
        commentId: data.commentId,
      },
    });
  }

  @MessagePattern('notifications.findByUser')
  findByUser(userId: number) {
    return this.notificationsService.findByUser(userId);
  }

  @MessagePattern('notifications.markAsRead')
  markAsRead(id: number) {
    return this.notificationsService.markAsRead(id);
  }

  @MessagePattern('service.ping')
  ping() {
    return this.notificationsService.ping();
  }
}
