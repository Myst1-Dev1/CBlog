import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';

async function bootstrap() {
  process.title = 'Gateway';

  const logger = new Logger('GatewayBootstrap');

  const app = await NestFactory.create(GatewayModule);

  app.enableShutdownHooks();

  const port = Number(process.env.GATEWAY_PORT ?? 4011);

  await app.listen(port);

  logger.log(`Gateway is running on http://localhost:${port}`);
}
bootstrap();
