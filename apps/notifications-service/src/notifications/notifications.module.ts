import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './entities/notifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
