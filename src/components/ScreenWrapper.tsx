import React from 'react';
import { View, StyleSheet, ScrollView, ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/colors';

interface ScreenWrapperProps extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = true,
  edges = ['top', 'bottom'],
  contentContainerStyle,
  ...scrollProps
}) => {
  const theme = useTheme();

  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...scrollProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.contentContainer, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});

