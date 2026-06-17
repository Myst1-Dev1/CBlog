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

  // const unreadCount = notifications!.filter(
  //   (notification) => !notification.read,
  // ).length;

  return {
    notifications,
    // unreadCount,
    markAsRead,
  };
}