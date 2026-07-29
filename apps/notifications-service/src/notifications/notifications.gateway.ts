import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  path: "/api/cblog/notifications/socket.io",
  cors: {
    origin: ['https://c-blog-web.vercel.app', 'http://localhost:3000'],
    credentials: true,
  }
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      void client.join(`user:${userId}`);
      console.log(`🔔 Usuário ${userId} conectado (Socket ID: ${client.id})`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
  }

  emitToUser(userId: number, payload: any) {
    this.server.to(`user:${userId}`).emit('notification', payload);
  }
}
