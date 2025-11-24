import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@navigation/types';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Typography } from '@components/Typography';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { validators } from '@utils/validators';

type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { register, isLoading } = useAuth();

  const handleRegister = () => {
    const validationErrors = validators.validateRegister(name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    register({ name, email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScreenWrapper scrollable contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Typography variant="h1" style={styles.title}>
            Create Account
          </Typography>
          <Typography
            variant="body"
            color="textSecondary"
            style={styles.subtitle}
          >
            Sign up to get started
          </Typography>
        </View>

        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password)
                setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
          />

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Typography variant="body" color="textSecondary">
            Already have an account?{' '}
          </Typography>
          <Typography
            variant="body"
            color="primary"
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </Typography>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontWeight: '600',
  },
});
