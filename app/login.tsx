'use client';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Login = {
  login: string;
  password: string;
};



export default function LoginScreen() {
  const [logins, setLogins] = useState<Login[]>([]);
const fetchLogins = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("http://192.168.0.15:5000/logins");
=======
        const response = await fetch("http://192.168.56.1:3000/logins");
>>>>>>> 063fd8660431d5c5503dd219828bf420323503e4
        const data: Login[] = await response.json();
        setLogins(data);
      } catch (error) {
        console.error("Błąd przy pobieraniu danych:", error);
      }
    };
    fetchLogins();
    


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
          onPress={() => {
            var temp: Boolean = true;
            logins.map((login: {login: string; password: string}) => {
              if(temp){
                if(login.login != input || login.password != inputPass) {
                  if(logins.indexOf(login) == logins.length - 1) {
                    Alert.alert("Error","Incorrect Login Credentials");
                  }
                  return;
                }
                router.navigate('/(tabs)');
                temp = false;
              }
            })
          }}
        />
        <Button
          title = {'Register'}
          onPress={() => {
            router.navigate('/register')
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  center: {
    flex: 1, justifyContent: "center", alignItems: "center" 
  },
});
