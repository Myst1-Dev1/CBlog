/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,

    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,

    @Inject('POSTS_CLIENT') private readonly postsClient: ClientProxy,

    @Inject('COMMENTS_CLIENT') private readonly commentsClient: ClientProxy,

    @Inject('NOTIFICATIONS_CLIENT')
    private readonly notificationsClient: ClientProxy,
  ) {}

  @Get('health')
  async health() {
    const ping = async (serviceName: string, client: ClientProxy) => {
      try {
        const result = await firstValueFrom(
          client.send('service.ping', { from: 'gateway' }),
        );

        return {
          ok: true,
          service: serviceName,
          result,
        };
      } catch (err: any) {
        return {
          ok: false,
          service: serviceName,
          error: err?.message ?? 'service unavailable',
        };
      }
    };

    const [auth, media, posts, comments, notifications] = await Promise.all([
      ping('auth', this.authClient),
      ping('media', this.mediaClient),
      ping('posts', this.postsClient),
      ping('comments', this.commentsClient),
      ping('notifications', this.notificationsClient),
    ]);

    const ok = [auth, media, posts, comments, notifications].every((s) => s.ok);

    return {
      ok,
      gateway: {
        service: 'gateway',
        now: new Date().toISOString(),
      },
      services: {
        auth,
        media,
        posts,
        comments,
        notifications,
      },
    };
  }
}
