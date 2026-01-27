import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MediaModule } from 'src/media/media.module';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: process.env.POSTS_QUEUE ?? 'posts_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    MediaModule,
  ],
  controllers: [PostsController],
  exports: [ClientsModule],
})
export class PostsModule {}
