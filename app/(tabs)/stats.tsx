import { useAuth } from '@/components/AuthContext';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Klata',
    message: '10 razy trenowana w tym miesiącu'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Plecy',
    message: '12 razy trenowana w tym miesiącu'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nogi',
    message: '5 razy trenowana w tym miesiącu'
  },
];

type ItemProps = {title: string, message: string};

const Item = ({title, message}: ItemProps) => {
  const { theme } = useAuth();
  const isDark = theme === 'dark';

  const backgroundColor = isDark ? '#363636ff' : '#f0f0f0';
  const textColor = isDark ? 'white' : 'black';
  const subTextColor = isDark ? '#ccc' : '#555';

  return (
    <View style={[styles.item, { backgroundColor }]}> 
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.stats, { color: subTextColor }]}>{message}</Text>
    </View>
  );
};

export default function ModalScreen() {
  const { theme } = useAuth();
  const containerBg = theme === 'dark' ? '#151718' : '#fff';

  return (
    <ThemedView style={[styles.container, { backgroundColor: containerBg }]}>
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  stats: {
    fontSize: 12,
  },
});