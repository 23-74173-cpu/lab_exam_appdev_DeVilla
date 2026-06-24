import { Tabs } from 'expo-router';
import React from 'react';
import { ClipboardList, FileText } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { ExamColors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: ExamColors.primary,
        tabBarInactiveTintColor: ExamColors.mutedText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lab Exam 1',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Lab Exam 2',
          tabBarIcon: ({ color, size }) => (
            <FileText size={size ?? 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
