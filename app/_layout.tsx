import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}