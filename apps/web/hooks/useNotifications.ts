// 'use client';

// import { useEffect, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { io, Socket } from 'socket.io-client';

// type NotificationPayload = {
//   type: 'COMMENT';
//   message: string;
//   metadata: {
//     postId: number;
//     commentId: number;
//   };
// };

// export function useNotifications(userId?: number) {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     if (!userId) return;

//     if (socketRef.current) return;

//     const socket = io('http://localhost:4016', {
//       query: { userId },
//     });

//     socketRef.current = socket;

//     socket.on('connect', () => {
//       console.log('🔌 Socket conectado');
//     });

//     socket.on('notification', (data: NotificationPayload) => {
//       toast.success(data.message);
//     });

//     socket.on('disconnect', () => {
//       console.log('❌ Socket desconectado');
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [userId]);
// }

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

  const [notifications, setNotifications] = useState<
    NotificationPayload[]
  >([]);

  console.log(userId);

  const fetchNotifications = async () => {
      try {
        const userCookie = Cookies.get('user');

        if (!userCookie) {
          throw new Error('Usuário não autenticado');
        }

        const token = JSON.parse(userCookie);

        const response = await fetch(
          `http://localhost:4011/notifications/${userId}`,
          {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      },
    );

    const data = await response.json();

    setNotifications(data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    const socket = io('http://localhost:4016', {
      query: {
        userId,
      },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Socket conectado');
    });

    socket.on('notification', (data: NotificationPayload) => {
      toast.success(data.message);

      setNotifications((prev) => [
        data,
        ...prev,
      ]);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket desconectado');
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
    if (!userId) {
      console.log('⚠️ userId é undefined');
      return;
    }

    try {
      const userCookie = Cookies.get('user');

      if (!userCookie) {
        throw new Error('Usuário não autenticado');
      }

      const token = JSON.parse(userCookie);
      console.log('📤 Enviando markAllAsRead para userId:', userId);

      const response = await fetch(`http://localhost:4011/notifications/read-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ Erro na resposta:', response.status, errorData);
        throw new Error(`Erro ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log('✅ markAllAsRead respondeu:', data);

      // Refetch para pegar notificações atualizadas do servidor
      console.log('🔄 Refetching notificações...');
      await fetchNotifications();
    } catch (err) {
      console.error('❌ Erro ao marcar notificações como lidas:', err);
    }
  };

  // const unreadCount = notifications!.filter(
  //   (notification) => !notification.read,
  // ).length;

  return {
    notifications,
    // unreadCount,
    markAsRead,
    markAllAsRead,
  };
}