import { create } from 'zustand';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:4011/';

export type User = {
  id: number;
  email: string;
  username: string;
  avatarUrl: string;
};

type UserState = {
  user: User | null;
  users: User[] | null;
  loading: boolean;
  error: string | null;

  fetchUserData: () => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  users: null,
  loading: false,
  error: null,

  fetchUserData: async () => {
    try {
      set({ loading: true, error: null });

      const userCookie = Cookies.get('user');

      if (!userCookie) {
        throw new Error('Usuário não autenticado');
      }

      const parsedUser = JSON.parse(userCookie);

      const res = await fetch(`${API_URL}auth/user/${parsedUser.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
        cache: 'no-store',
        next: {
          tags: ['user']
        }
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const data = await res.json();

      set({
        user: data,
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || 'Erro inesperado',
      });
    }
  },

  fetchAllUsers: async () => {
    set({ loading: true, error: null });

      const res = await fetch(`${API_URL}auth/users`, {
        method: 'GET',
        cache: 'no-store',
        next: {
          tags: ['users']
        }
      });

      if (!res.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const data = await res.json();

      set({
        users: data,
        loading: false,
      });
  },

  clearUser: () => {
    Cookies.remove('user');
    set({ user: null, loading: false, error: null });
  },
}));
