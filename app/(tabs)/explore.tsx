import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';


export default function HomeScreen() {
  const [input, onChangeText] = React.useState('');
  const [inputPass, onChangePass] = React.useState('');
  return (
    <ThemedView>
      <Text style={{color: 'white', fontSize: 40}}>Podciąganie</Text>
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
            placeholder='Number of sets'
            />
    <TextInput
            style={{
              width: 250,
              height: 50,
              margin: 20,
              borderWidth: 1,
              padding: 10,
              backgroundColor: 'white'
            }}
            secureTextEntry
            maxLength={50}
            onChangeText={text => onChangePass(text)}
            value = {inputPass}
            placeholder='Number of reps'
            />
            
            <Button
              title = {'Add Exercise'}
              
            />
            <Button
              title = {'Submit'}
              
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
