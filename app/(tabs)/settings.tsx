import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ModalScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    if (systemTheme) {
      setTheme(systemTheme);
    }
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsEnabled(!isEnabled);
  };

  const toggleSwitch2 = () => {setIsEnabled2(!isEnabled2);
  };

  const DATA = [
    {
      f: toggleSwitch,
      b: isEnabled,
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dark mode',
    },
    {
      f: toggleSwitch2,
      b: isEnabled2,
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Powiadominia',
    },
  ];

  const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
  const buttonStyle = theme === 'light' ? styles.lightButton : styles.darkButton;
  const buttonTextStyle = theme === 'light' ? styles.lightButtonText : styles.darkButtonText;
  
  const logoutButtonStyle = theme === 'light' ? styles.lightLogoutButton : styles.darkLogoutButton;
  const logoutButtonTextStyle = theme === 'light' ? styles.lightLogoutButtonText : styles.darkLogoutButtonText;

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={[styles.button, buttonStyle]}
              onPress={item.f}
            >
              <Text style={[styles.buttonText, buttonTextStyle]}>{item.title}</Text>
            </TouchableOpacity>
            <Switch
              trackColor={{ false: '#767577', true: '#d8e6ffff' }}
              thumbColor={isEnabled ? '#ffffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item.f}
              value={item.b}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      <TouchableOpacity
        style={[styles.button, logoutButtonStyle]}
        onPress={() => {
            router.navigate('/login')
          }}
        
      >
        <Text style={[styles.buttonText, logoutButtonTextStyle]}>Wyloguj</Text>
      </TouchableOpacity>
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
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  lightButton: {
    backgroundColor: '#007bff',
  },
  darkButton: {
    backgroundColor: '#1c1c1c',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#fff',
  },
  darkButtonText: {
    color: '#f0f0f0',
  },
  lightLogoutButton: {
    backgroundColor: '#ff5656ff',
  },
  darkLogoutButton: {
    backgroundColor: '#ff0000ff',
  },
  lightLogoutButtonText: {
    color: '#fff',
  },
  darkLogoutButtonText: {
    color: '#f0f0f0',
  },
});