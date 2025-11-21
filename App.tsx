/**
 * Todo App - React Native
 * A professional todo application with modular architecture
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './src/theme/colors';
import { useTodos } from './src/hooks/useTodos';
import {
  Header,
  TodoInput,
  TodoFilter,
  TodoList,
  EmptyState,
  ClearButton,
} from './src/components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <AppContent theme={theme} />
    </SafeAreaProvider>
  );
}

function AppContent({ theme }: { theme: ReturnType<typeof useTheme> }) {
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
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <Header theme={theme} activeCount={stats.active} />

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
}

export default App;
