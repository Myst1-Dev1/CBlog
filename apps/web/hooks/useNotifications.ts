'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
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

    if (socketRef.current) return;

    const socket = io('http://localhost:4016', {
      query: { userId },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Socket conectado');
    });

    socket.on('notification', (data: NotificationPayload) => {
      toast.success(data.message);
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
