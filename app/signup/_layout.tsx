import { Stack } from 'expo-router';

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="step/1" options={{ title: 'Create Account' }} />
      <Stack.Screen name="step/2" options={{ title: 'Professional Info' }} />
      <Stack.Screen name="step/3" options={{ title: 'Create Password' }} />
      <Stack.Screen name="step/success" options={{ title: 'Email Verification' }} />
    </Stack>
  );
}