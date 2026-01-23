import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MediaModule } from 'src/media/media.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || 'myst_like_girls',
    //   signOptions: { expiresIn: '1d' },
    // }),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
          ],
          queue: process.env.AUTH_QUEUE ?? 'auth_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    MediaModule,
  ],
  controllers: [AuthController],
  exports: [ClientsModule],
})
export class AuthModule {}
