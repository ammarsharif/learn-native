import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/colors';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'primary' | 'text' | 'textSecondary' | 'error';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const variantStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    body: styles.body,
    caption: styles.caption,
  };

  const colorStyles = {
    primary: { color: theme.primary },
    text: { color: theme.text },
    textSecondary: { color: theme.textSecondary },
    error: { color: theme.danger },
  };

  return (
    <Text
      style={[variantStyles[variant], colorStyles[color], style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});

