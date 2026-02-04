import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './entities/notifications.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: 'gateway_events_queue',
          queueOptions: { durable: false },
        },
      },
  ]),
    TypeOrmModule.forFeature([Notifications])],
  providers: [NotificationsService, NotificationsGateway],
  controllers: [NotificationsController],
  exports: [ClientsModule]
})
export class NotificationsModule {}
