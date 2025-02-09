import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue
} from 'react-native-reanimated';

export default function TabLayout() {
  const { isTabBarVisible } = useScrollToTop();
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(isTabBarVisible ? 0 : 100, {
      damping: 20,
      stiffness: 90
    });
  }, [isTabBarVisible]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 16,
          height: 65,
          transform: [{ translateY: translateY.value }]
        },
        tabBarActiveTintColor: '#4FC3F7',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training',
          tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Ionicons name="restaurant-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recovery"
        options={{
          title: 'Recovery',
          tabBarIcon: ({ color }) => <Ionicons name="fitness-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="create-plan"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="add-meal"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
