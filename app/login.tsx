'use client';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';

import { useAuth } from '@/components/AuthContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type LoginUser = {
  id: string;
  login: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [inputLogin, setInputLogin] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!inputLogin || !inputPass) {
      Alert.alert("Błąd", "Wprowadź login i hasło");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://192.168.56.1:3000/logins?login=${inputLogin}&password=${inputPass}`
      );
      
      const users: LoginUser[] = await response.json();

      if (users.length > 0) {
        const user = users[0];

        login(user.id); 

        router.replace('/(tabs)'); 
      } else {
        Alert.alert("Błąd", "Nieprawidłowy login lub hasło");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      Alert.alert("Błąd", "Problem z połączeniem z serwerem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log in</ThemedText>
      
      <TextInput
        style={styles.input}
        maxLength={50}
        onChangeText={setInputLogin}
        value={inputLogin}
        placeholder='Login'
        placeholderTextColor="#666"
      />
      
      <TextInput
        style={styles.input}
        secureTextEntry
        maxLength={50}
        onChangeText={setInputPass}
        value={inputPass}
        placeholder='Password'
        placeholderTextColor="#666"
      />

      <Button
        title={isLoading ? "Logowanie..." : "Zaloguj"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      
      <ThemedView style={{ height: 10 }} /> 

      <Button
        title={'Zarejestruj się'}
        color="#666"
        onPress={() => {
          router.navigate('/register');
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: 250,
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc'
  },
});