import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../theme/colors';
import { useTodos } from '../hooks/useTodos';
import {
  Header,
  TodoInput,
  TodoFilter,
  TodoList,
  EmptyState,
  ClearButton,
} from '../components';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredTodos,
    stats,
  } = useTodos();

  const filteredTodos = getFilteredTodos();
  const hasTodos = todos.length > 0;

  return (
    <View
      className="flex-1 px-4 py-6"
      style={{ backgroundColor: theme.background }}
    >
      <Header theme={theme} activeCount={stats.active} />

      <View className="mt-4 flex-row justify-end">
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-full px-4 py-2"
          onPress={() => navigation.navigate('Profile')}
          style={{ backgroundColor: theme.primary }}
        >
          <Text
            className="text-sm font-semibold text-center"
            style={{ color: theme.card }}
          >
            View Profile
          </Text>
        </TouchableOpacity>
      </View>

      <TodoInput theme={theme} onAddTodo={addTodo} />

      {hasTodos && (
        <TodoFilter
          theme={theme}
          filter={filter}
          onFilterChange={setFilter}
          stats={stats}
        />
      )}

      {filteredTodos.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          theme={theme}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ) : (
        <EmptyState theme={theme} filter={filter} hasTodos={hasTodos} />
      )}

      <ClearButton
        theme={theme}
        completedCount={stats.completed}
        onClear={clearCompleted}
      />
    </View>
  );
};