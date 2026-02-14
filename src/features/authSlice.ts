import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@services/api';
import { AUTH_TOKEN_KEY } from '@constants/config';
import type { User } from '@types/index';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      login: async (payload) => {
        set({ loading: true });
        const data = await authApi.login(payload);
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        set({ user: data.user, token: data.token, loading: false });
      },
      register: async (payload) => {
        set({ loading: true });
        const data = await authApi.register(payload);
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        set({ user: data.user, token: data.token, loading: false });
      },
      logout: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        set({ user: null, token: null });
      }
    }),
    { name: 'auth-state' }
  )
);
