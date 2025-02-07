import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { OnboardingProvider } from '../context/OnboardingContext';
import { TrainingProvider } from '../context/TrainingContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <TrainingProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
            }} 
          />
          <Stack.Screen 
            name="delete-feedback" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_bottom',
              presentation: 'modal'
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </TrainingProvider>
    </OnboardingProvider>
  );
}
