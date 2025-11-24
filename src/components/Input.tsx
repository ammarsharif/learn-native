import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  secureTextEntry,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isSecure, setIsSecure] = useState(secureTextEntry || false);

  return (
    <View style={styles.container}>
      {label && (
        <Typography
          variant="caption"
          color="textSecondary"
          style={styles.label}
        >
          {label}
        </Typography>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.input,
              borderColor: error ? theme.danger : theme.border,
            },
            style,
          ]}
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsSecure(!isSecure)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Typography variant="caption" color="textSecondary">
              {isSecure ? 'Show' : 'Hide'}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Typography variant="caption" color="error" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 52,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
    padding: 4,
  },
  error: {
    marginTop: 4,
  },
});

