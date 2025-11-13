import { ThemedText } from "@/components/themed-text";
import React from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

type Login = {
  login: string;
  password: string;
};

export default function RegisterScreen() {
  const [login, onChangeText] = React.useState('');
    const [password, onChangePass] = React.useState('');

  const handleRegister = async () => {
    if (!login || !password) {
      Alert.alert("Błąd", "Wypełnij wszystkie pola");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.166:3000/logins", {
        method: "POST",
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      if (res.ok) {
        const newUser: Login = await res.json();
        Alert.alert("Success", "Created new account");
        onChangeText("");
        onChangePass("");
      } else {
        Alert.alert("Error", "Couldn't add a new account");
      }
    } catch (error) {
      Alert.alert("Network Error", "Couldn't connect to the server");
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Register</ThemedText>
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
              value = {login}
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
              value = {password}
              placeholder='Password'
              />
      <Button title="Register" onPress={handleRegister} />
    </View>
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