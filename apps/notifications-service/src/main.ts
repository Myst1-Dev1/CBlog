import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  process.title = 'notifications-service';

  const logger = new Logger('PostsServiceBootstrap');

  const rmqurl = process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672';

  const queue = process.env.NOTIFICATIONS_QUEUE ?? 'notifications_queue';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqurl],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.enableShutdownHooks();

  await app.listen();

  logger.log(`Notifications RMQ listen on queue ${queue} via ${rmqurl}`);
}
bootstrap();
