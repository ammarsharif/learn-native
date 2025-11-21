import { useState, useCallback } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Todo, FilterType } from '../types/Todo';
import { ALERT_MESSAGES, ALERT_BUTTONS } from '../utils/constants';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') {
      Alert.alert(
        ALERT_MESSAGES.EMPTY_TODO.title,
        ALERT_MESSAGES.EMPTY_TODO.message
      );
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
    Keyboard.dismiss();
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    Alert.alert(
      ALERT_MESSAGES.DELETE_TODO.title,
      ALERT_MESSAGES.DELETE_TODO.message,
      [
        { text: ALERT_BUTTONS.CANCEL, style: 'cancel' },
        {
          text: ALERT_BUTTONS.DELETE,
          style: 'destructive',
          onPress: () => setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)),
        },
      ]
    );
  }, []);

  const clearCompleted = useCallback(() => {
    const hasCompleted = todos.some(todo => todo.completed);
    if (!hasCompleted) return;

    Alert.alert(
      ALERT_MESSAGES.CLEAR_COMPLETED.title,
      ALERT_MESSAGES.CLEAR_COMPLETED.message,
      [
        { text: ALERT_BUTTONS.CANCEL, style: 'cancel' },
        {
          text: ALERT_BUTTONS.CLEAR,
          style: 'destructive',
          onPress: () => setTodos(prevTodos => prevTodos.filter(todo => !todo.completed)),
        },
      ]
    );
  }, [todos]);

  const getFilteredTodos = useCallback(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredTodos,
    stats,
  };
};

