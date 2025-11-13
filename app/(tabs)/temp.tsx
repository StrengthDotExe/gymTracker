
import { ThemedView } from '@/components/themed-view';

import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Push/Pull/Legs',
    message: 'Ławka płaska: 3x12\nPodciągnięcia: 3x10'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Full Body',
    message: 'Przysiady: 3x6\nŁawka ze skosem dodatnim: 3x12'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Upper/Lower',
    message: 'Hammer curl: 3x12\nMartwy ciąg: 3x8'
  },
];

type ItemProps = {title: string, message: string};

const Item = ({title, message}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.stats}>{message}</Text>
  </View>
);

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} message={item.message}/>}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#363636ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  stats: {
    fontSize: 12,
    color: 'white',
  },
});

///aaaaaaaa