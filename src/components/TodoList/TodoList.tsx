import React from 'react';
import { FlatList } from 'react-native';
import { Todo } from '../../types/Todo';
import { Theme } from '../../theme/colors';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  theme: Theme;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  theme,
  onToggle,
  onDelete,
}) => {
  const renderItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      theme={theme}
      onToggle={onToggle}
      onDelete={onDelete}
    />
  );

  return (
    <FlatList
      className="flex-1"
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

