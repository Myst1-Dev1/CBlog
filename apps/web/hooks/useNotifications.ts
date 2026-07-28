'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

export type NotificationPayload = {
  id: number;
  type: 'COMMENT';
  message: string;
  read: boolean;
  createdAt: string;
  metadata: {
    postId: number;
    commentId: number;
    commenterId: number;
  };
};

export function useNotifications(userId?: number) {
  const socketRef = useRef<Socket | null>(null);

  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const userCookie = Cookies.get('user');

      if (!userCookie) {
        throw new Error('Usuário não autenticado');
      }

      const { token } = JSON.parse(userCookie);

      const response = await fetch(
        `https://lab.mystdev.com.br/api/cblog/notifications/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        console.error(
          'Erro ao buscar notificações:',
          response.status,
          response.statusText,
        );

        setNotifications([]);
        return;
      }

      const data = await response.json();

      console.log('📥 Notifications:', data);

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    const socket = io('https://lab.mystdev.com.br', {
      path: '/api/cblog/notifications/socket.io',
      query: {
        userId: String(userId),
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 Socket conectado:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('🔴 Socket connect_error:', err.message);
    });

    socket.on('error', (err) => {
      console.error('🔴 Socket error:', err);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket desconectado:', reason);
    });

    socket.on('notification', (notification: NotificationPayload) => {
      console.log('📨 Nova notificação:', notification);

      toast.success(notification.message);

      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = async () => {
    if (!userId) return;

    try {
      const userCookie = Cookies.get('user');

      if (!userCookie) {
        throw new Error('Usuário não autenticado');
      }

      const { token } = JSON.parse(userCookie);

      const response = await fetch(
        'https://lab.mystdev.com.br/api/cblog/notifications/read-all',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
  };
}