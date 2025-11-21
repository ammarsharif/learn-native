import React from 'react';
import { View, Text } from 'react-native';
import { FilterType } from '../../types/Todo';
import { Theme } from '../../theme/colors';

interface EmptyStateProps {
  theme: Theme;
  filter: FilterType;
  hasTodos: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  theme,
  filter,
  hasTodos,
}) => {
  const getMessage = () => {
    if (!hasTodos) {
      return 'No todos yet. Add one above!';
    }
    switch (filter) {
      case 'active':
        return 'No active todos. Great job!';
      case 'completed':
        return 'No completed todos yet.';
      default:
        return 'No todos found.';
    }
  };

  return (
    <View className="flex-1 justify-center items-center py-16 px-8">
      <Text
        className="text-base text-center"
        style={{ color: theme.textSecondary }}
      >
        {getMessage()}
      </Text>
    </View>
  );
};

