import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('NotificationsBootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672',
      ],
      queue: process.env.NOTIFICATIONS_QUEUE || 'notifications_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4016);

  logger.log('🔔 Notifications HTTP + WS on :4016');
}
bootstrap();
