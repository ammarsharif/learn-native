import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Todo } from '../../types/Todo';
import { Theme } from '../../theme/colors';

interface TodoItemProps {
  todo: Todo;
  theme: Theme;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  theme,
  onToggle,
  onDelete,
}) => {
  return (
    <View
      className="flex-row items-center px-4 py-4 mb-3 rounded-2xl border shadow-sm shadow-black/5"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <TouchableOpacity
        className="flex-1 flex-row items-center"
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <View
          className="w-6 h-6 mr-3 rounded-full border-2 items-center justify-center"
          style={{
            backgroundColor: todo.completed ? theme.success : 'transparent',
            borderColor: todo.completed ? theme.success : theme.border,
          }}
        >
          {todo.completed && (
            <Text className="text-sm font-bold text-white">✓</Text>
          )}
        </View>
        <Text
          className="flex-1 text-base"
          style={{
            color: todo.completed ? theme.textSecondary : theme.text,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-2 ml-2"
        onPress={() => onDelete(todo.id)}
        activeOpacity={0.7}
      >
        <Text className="text-xl font-bold" style={{ color: theme.danger }}>
          ✕
        </Text>
      </TouchableOpacity>
    </View>
  );
};

