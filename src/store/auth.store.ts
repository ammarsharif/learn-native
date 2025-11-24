import { create } from 'zustand';
import { User } from '@typings/auth.types';
import { storage } from '@utils/storage';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user: User, accessToken: string, refreshToken: string) => {
    await storage.setUser(JSON.stringify(user));
    await storage.setAccessToken(accessToken);
    await storage.setRefreshToken(refreshToken);
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  setTokens: async (accessToken: string, refreshToken: string) => {
    await storage.setAccessToken(accessToken);
    await storage.setRefreshToken(refreshToken);
    set({
      accessToken,
      refreshToken,
    });
  },

  setUser: async (user: User) => {
    await storage.setUser(JSON.stringify(user));
    set({ user });
  },

  logout: async () => {
    await storage.clearAll();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  initialize: async () => {
    try {
      const [accessToken, refreshToken, userString] = await Promise.all([
        storage.getAccessToken(),
        storage.getRefreshToken(),
        storage.getUser(),
      ]);

      if (accessToken && refreshToken && userString) {
        const user = JSON.parse(userString) as User;
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      await storage.clearAll();
      set({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

