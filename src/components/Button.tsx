import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../theme/colors';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
  style?: TouchableOpacityProps['style'];
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const theme = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: theme.primary,
    },
    secondary: {
      backgroundColor: theme.textSecondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.primary,
    },
  };

  const textColor = {
    primary: theme.card,
    secondary: theme.card,
    outline: theme.primary,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={textColor[variant]}
          size="small"
        />
      ) : (
        <Typography
          variant="body"
          style={[
            styles.text,
            { color: textColor[variant], fontWeight: '600' },
          ]}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});

