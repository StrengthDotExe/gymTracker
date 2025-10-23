import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
       <ScrollView>
        <Text style={{fontSize: 30, color: 'white'}}>This is Home Page</Text>
        <Text style={styles.stepContainer}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat fugit aliquid hic mollitia tenetur obcaecati, laborum dolores ipsa inventore adipisci deleniti tempora dolorum laudantium similique modi provident perspiciatis alias? Perspiciatis!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora impedit ipsum libero reprehenderit. Repellat totam consequatur itaque distinctio minus, placeat ipsam dolorem quasi dolores fugit aliquid cumque modi perferendis nisi!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere similique magni dolor veniam ratione, temporibus molestiae cupiditate accusamus id sequi nesciunt aspernatur vel quaerat aperiam iste quos numquam? Aspernatur, repellat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quidem pariatur iusto rem iste asperiores dolore perspiciatis quae deserunt nihil, a rerum voluptatibus enim sit voluptate fuga animi ipsam aut.

        </Text>
       </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    color: 'white',
    fontSize: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
