import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notifications.entity';
import { CreateNotificationDto } from './dto/createNotificationDto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepo: Repository<Notifications>,

    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(data: CreateNotificationDto): Promise<Notifications> {
    const notification = this.notificationRepo.create({
      ...data,
      read: false,
    });

    const saved = await this.notificationRepo.save(notification);

    // 🔥 AQUI ESTAVA O PROBLEMA
    this.notificationsGateway.emitToUser(data.userId, saved);

    return saved;
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

  hello() {
    return {
      message: 'Hello from notifications service'
    }
  }
}
