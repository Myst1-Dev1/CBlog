import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsGateway } from './notifications.gateway';

@Controller()
export class NotificationsEventsController {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  @EventPattern('comment.created')
  handleCommentCreated(
    @Payload()
    data: {
      postAuthorId: number;
      commenterName: string;
      postId: number;
      commentId: number;
    },
  ) {
    this.notificationsGateway.emitToUser(data.postAuthorId, {
      type: 'COMMENT',
      message: `${data.commenterName} comentou no seu post`,
      metadata: {
        postId: data.postId,
        commentId: data.commentId,
      },
    });
  }
}
