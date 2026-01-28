/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;

    if (userId) {
      client.join(`user:${userId}`);
      console.log(`🔔 User ${userId} conectado no WS`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('❌ Cliente desconectado', client);
  }

  emitToUser(userId: number, payload: any) {
    this.server.to(`user:${userId}`).emit('notification', payload);
  }
}
