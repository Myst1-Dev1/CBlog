import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENTS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: process.env.COMMENTS_QUEUE ?? 'comments_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    PostsModule,
  ],
  controllers: [CommentsController],
  exports: [ClientsModule],
})
export class CommentsModule {}
