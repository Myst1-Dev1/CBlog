import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsEventsController } from './notifications-events.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: process.env.NOTIFICATIONS_QUEUE ?? 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
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
  ],
  controllers: [NotificationsController, NotificationsEventsController],
  providers: [NotificationsGateway],
  exports: [ClientsModule],
})
export class NotificationsModule {}
