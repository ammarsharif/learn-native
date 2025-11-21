import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '../../theme/colors';

interface HeaderProps {
  theme: Theme;
  activeCount: number;
}

export const Header: React.FC<HeaderProps> = ({ theme, activeCount }) => {
  return (
    <View className="px-5 pt-5 pb-2">
      <Text className="text-4xl font-bold" style={{ color: theme.text }}>
        My Todos
      </Text>
      {activeCount > 0 && (
        <Text className="text-sm" style={{ color: theme.textSecondary }}>
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </Text>
      )}
    </View>
  );
};

