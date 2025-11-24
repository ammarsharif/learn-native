import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@store/auth.store';
import { authApi } from '@api/auth.api';
import { LoginCredentials, RegisterCredentials } from '@typings/auth.types';
import Toast from 'react-native-toast-message';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setAuth, logout: storeLogout, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: `Logged in as ${data.user.name}`,
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.response?.data?.message || 'Invalid email or password',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      Toast.show({
        type: 'success',
        text1: 'Account created!',
        text2: `Welcome, ${data.user.name}`,
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: error.response?.data?.message || 'Could not create account',
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      await storeLogout();
      queryClient.clear();
      Toast.show({
        type: 'success',
        text1: 'Logged out',
        text2: 'See you soon!',
      });
    },
    onError: async () => {
      await storeLogout();
      queryClient.clear();
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: () => logoutMutation.mutate(),
    isLoading: loginMutation.isPending || registerMutation.isPending,
    isAuthenticated,
  };
};

