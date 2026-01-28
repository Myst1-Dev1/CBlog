import {
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    @Inject('NOTIFICATIONS_CLIENT')
    private readonly notificationsClient: ClientProxy,
  ) {}

  @Get(':userId')
  async getByUser(@Param('userId') userId: string): Promise<any> {
    return firstValueFrom(
      this.notificationsClient.send('notifications.findByUser', Number(userId)),
    );
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string): Promise<any> {
    return firstValueFrom(
      this.notificationsClient.send('notifications.markAsRead', Number(id)),
    );
  }
}
