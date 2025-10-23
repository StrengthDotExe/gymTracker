import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [input, onChangeText] = React.useState('');
  const [inputPass, onChangePass] = React.useState('');
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log in</ThemedText>
      <TextInput
        style={{
          width: 250,
          height: 50,
          margin: 20,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white'
        }}
        maxLength={50}
        onChangeText={text => onChangeText(text)}
        value = {input}
        placeholder='Login'
        />
        <TextInput
        style={{
          width: 250,
          height: 50,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white'
        }}
        secureTextEntry
        maxLength={50}
        onChangeText={text => onChangePass(text)}
        value = {inputPass}
        placeholder='Password'
        />
        <Button
          title = {'Submit'}
          onPress={() => router.navigate('/(tabs)')}
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
