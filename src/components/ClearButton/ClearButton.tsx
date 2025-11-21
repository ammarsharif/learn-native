import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Theme } from '../../theme/colors';

interface ClearButtonProps {
  theme: Theme;
  completedCount: number;
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  theme,
  completedCount,
  onClear,
}) => {
  if (completedCount === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      className="mx-4 mb-4 px-4 py-4 rounded-2xl border items-center justify-center shadow-sm shadow-black/10"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
      onPress={onClear}
      activeOpacity={0.7}
    >
      <Text className="text-base font-semibold" style={{ color: theme.danger }}>
        Clear Completed ({completedCount})
      </Text>
    </TouchableOpacity>
  );
};

