import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const theme = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: theme.background }}
    >
      <View
        className="w-full max-w-md space-y-6 rounded-3xl border px-6 py-8"
        style={{ borderColor: theme.border, backgroundColor: theme.card }}
      >
        <Text
          className="text-3xl font-bold text-center"
          style={{ color: theme.text }}
        >
          Profile Overview
        </Text>

        <Text
          className="text-base leading-relaxed text-center"
          style={{ color: theme.textSecondary }}
        >
          Manage your account, check recent activity, and set habits that keep
          you productive.
        </Text>

        <View className="space-y-4 rounded-2xl border p-4" style={{ borderColor: theme.border }}>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold" style={{ color: theme.textSecondary }}>
              Focus streak
            </Text>
            <Text className="text-2xl font-bold" style={{ color: theme.primary }}>
              12 days
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold" style={{ color: theme.textSecondary }}>
              Tasks completed
            </Text>
            <Text className="text-2xl font-bold" style={{ color: theme.success }}>
              88
            </Text>
          </View>
        </View>

        <View className="rounded-2xl border px-4 py-3" style={{ borderColor: theme.border }}>
          <Text className="text-base font-semibold" style={{ color: theme.text }}>
            Settings
          </Text>
          <Text className="text-sm" style={{ color: theme.textSecondary }}>
            Preferences, reminders, and integrations are coming soon. Stay tuned
            for more customization.
          </Text>
        </View>

        <View className="mt-6 items-center w-full">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full rounded-full px-4 py-3"
            onPress={() => navigation.navigate('Home')}
            style={{ backgroundColor: theme.success }}
          >
            <Text
              className="text-center text-base font-semibold"
              style={{ color: theme.card }}
            >
              Back to Todos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};