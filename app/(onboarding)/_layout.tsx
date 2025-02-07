import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="age" />
      <Stack.Screen name="measurements" />
      <Stack.Screen name="level" />
      <Stack.Screen name="position" />
      <Stack.Screen name="injury" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="motivation" />
      <Stack.Screen name="paywall" />
    </Stack>
  );
} 