import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_BUS',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: process.env.NOTIFICATIONS_QUEUE || 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    TypeOrmModule.forFeature([Comments]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [ClientsModule],
})
export class CommentsModule {}
