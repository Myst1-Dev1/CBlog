import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('comment.created')
  async onCommentCreated(
    @Payload()
    data: {
      targetUserId: number;
      commenterId: number;
      commenterName: string;
      postId: number;
      commentId: number;
    },
  ) {
    console.log('📨 EVENTO RECEBIDO:', data);

    return this.notificationsService.create({
      userId: data.targetUserId,
      type: 'COMMENT',
      message: `${data.commenterName} comentou no seu post`,
      metadata: {
        postId: data.postId,
        commentId: data.commentId,
        commenterId: data.commenterId,
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

  @Get()
  hello() {
    return this.notificationsService.hello();
  }
}
