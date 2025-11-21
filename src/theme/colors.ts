import { useColorScheme } from 'react-native';

export interface Theme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryDark: string;
  success: string;
  danger: string;
  input: string;
}

export const lightTheme: Theme = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e0e0e0',
  primary: '#007AFF',
  primaryDark: '#0051D5',
  success: '#34C759',
  danger: '#FF3B30',
  input: '#f8f8f8',
};

export const darkTheme: Theme = {
  background: '#1a1a1a',
  card: '#2d2d2d',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#404040',
  primary: '#007AFF',
  primaryDark: '#0051D5',
  success: '#34C759',
  danger: '#FF3B30',
  input: '#3d3d3d',
};

export const useTheme = (): Theme => {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? darkTheme : lightTheme;
};

