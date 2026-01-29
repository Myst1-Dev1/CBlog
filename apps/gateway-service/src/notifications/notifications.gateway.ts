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
    // O query param geralmente vem como string
    const userId = client.handshake.query.userId as string;

    if (userId) {
      void client.join(`user:${userId}`);
      console.log(`🔔 Usuário ${userId} conectado (Socket ID: ${client.id})`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
  }

  // Se o ID no banco é number, mantemos a tipagem aqui
  emitToUser(userId: number, payload: any) {
    this.server.to(`user:${userId}`).emit('notification', payload);
  }
}
