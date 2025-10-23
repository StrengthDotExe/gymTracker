import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Switch, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const DATA = [
  {
    f: toggleSwitch,
    b: isEnabled,
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    f: toggleSwitch2,
    b: isEnabled2,
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    f: toggleSwitch3,
    b: isEnabled3,
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

  return (
    <ThemedView style={styles.container}>
        
    <FlatList
        data={DATA}
        renderItem={({item}) => 
        <View>
            <Button title={item.title}/>
            <Switch
          trackColor={{false: '#767577', true: '#d8e6ffff'}}
          thumbColor={isEnabled ? '#ffffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={item.f}
          value={item.b}
      />
        </View>}
        keyExtractor={item => item.id}
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
