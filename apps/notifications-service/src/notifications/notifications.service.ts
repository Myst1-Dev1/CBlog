import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from './entities/notifications.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/createNotificationDto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepo: Repository<Notifications>,
  ) {}

  async create(data: CreateNotificationDto): Promise<Notifications> {
    const notification = this.notificationRepo.create({
      ...data,
      read: false,
    });

    return this.notificationRepo.save(notification);
  }

  async markAsRead(id: number) {
    await this.notificationRepo.update(id, { read: true });
  }

  async findByUser(userId: number) {
    return this.notificationRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  ping() {
    return {
      ok: true,
      service: 'notifications',
      now: new Date().toISOString(),
    };
  }
}
