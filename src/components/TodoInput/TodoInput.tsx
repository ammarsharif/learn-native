import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Theme } from '../../theme/colors';

interface TodoInputProps {
  theme: Theme;
  onAddTodo: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ theme, onAddTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim()) {
      onAddTodo(inputText);
      setInputText('');
    }
  };

  return (
    <View
      className="flex-row items-center px-4 py-4 mt-4 mx-4 mb-3 rounded-2xl border shadow-sm shadow-black/10"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <TextInput
        className="flex-1 h-12 px-4 mr-3 rounded-xl text-base"
        style={{ color: theme.text, backgroundColor: theme.input }}
        placeholder="Add a new todo..."
        placeholderTextColor={theme.textSecondary}
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity
        className="px-6 h-12 rounded-xl justify-center items-center"
        style={{ backgroundColor: theme.primary }}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text className="text-base font-semibold text-white">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

