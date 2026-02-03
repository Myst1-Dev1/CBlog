'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type NotificationPayload = {
  type: 'COMMENT';
  message: string;
  metadata: {
    postId: number;
    commentId: number;
  };
};

export function useNotifications(userId?: number) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    if (socketRef.current) return; // evita reconectar

    const socket = io('http://localhost:4011', {
      query: { userId },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Socket conectado');
    });

    socket.on('notification', (data: NotificationPayload) => {
      console.log('🔔 Nova notificação:', data);

      // ALERTA (temporário)
      alert(data.message);

      // depois:
      // toast(data.message)
      // notificationsStore.add(data)
      // playSound()
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket desconectado');
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);
}
