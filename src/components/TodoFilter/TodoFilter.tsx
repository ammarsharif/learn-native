import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FilterType } from '../../types/Todo';
import { Theme } from '../../theme/colors';

interface TodoFilterProps {
  theme: Theme;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  theme,
  filter,
  onFilterChange,
  stats,
}) => {
  const filterOptions: Array<{ key: FilterType; label: string; count: number }> = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <View className="flex-row px-4 mb-3 space-x-2">
      {filterOptions.map(option => (
        <TouchableOpacity
          key={option.key}
          className="flex-1 rounded-lg border py-2 px-3 items-center justify-center"
          style={{
            backgroundColor: filter === option.key ? theme.primary : theme.card,
            borderColor: theme.border,
          }}
          onPress={() => onFilterChange(option.key)}
          activeOpacity={0.7}
        >
          <Text
            className="text-sm"
            style={{
              color: filter === option.key ? '#ffffff' : theme.text,
              fontWeight: filter === option.key ? '600' : '400',
            }}
          >
            {option.label} ({option.count})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

