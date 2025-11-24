import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Typography } from '@components/Typography';
import { Button } from '@components/Button';
import { useAuthStore } from '@store/auth.store';
import { useAuth } from '@hooks/useAuth';

export const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.welcome}>
            Welcome, {user?.name || 'User'}!
          </Typography>
          <Typography variant="body" color="textSecondary" style={styles.subtitle}>
            You're successfully logged in
          </Typography>
        </View>

        <View style={styles.info}>
          <Typography variant="body" color="textSecondary">
            Email: {user?.email}
          </Typography>
        </View>

        <View style={styles.actions}>
          <Button
            title="Logout"
            variant="outline"
            onPress={logout}
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  welcome: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  info: {
    marginBottom: 40,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  actions: {
    width: '100%',
    maxWidth: 300,
  },
});

