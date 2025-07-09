import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { StyleSheet, View } from 'react-native'; // Import StyleSheet and View

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={styles.container}> 
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This is crucial for filling the screen
    backgroundColor: '#f0f0f0', // This will be the background of your entire app
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
});