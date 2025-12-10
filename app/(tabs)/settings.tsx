import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ModalScreen() {
  const { userId, logout, theme, toggleTheme } = useAuth(); 
  
  const [isEnabled2, setIsEnabled2] = useState(false);
  const router = useRouter();
  const API_URL = 'http://192.168.56.1:3000/logins';

  const handleThemeSwitch = () => {
    toggleTheme();
  };

  const toggleSwitch2 = () => {
    setIsEnabled2(!isEnabled2);
  };

  const deleteAccount = async () => {
    if (!userId) return;
    Alert.alert(
      "Usuń konto",
      "Czy na pewno chcesz trwale usunąć swoje konto? Tej operacji nie można cofnąć.",
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${userId}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                logout();
                Alert.alert("Sukces", "Konto zostało usunięte.");
                router.replace('/login');
              } else {
                throw new Error("Błąd serwera");
              }
            } catch (error) {
              console.error("Błąd usuwania konta:", error);
              Alert.alert("Błąd", "Nie udało się usunąć konta.");
            }
          }
        }
      ]
    );
  };

  const DATA = [
    {
      f: handleThemeSwitch,
      b: theme === 'dark',
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dark mode',
    },
    {
      f: toggleSwitch2,
      b: isEnabled2,
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Powiadomienia',
    },
  ];

  const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
  const buttonStyle = theme === 'light' ? styles.lightButton : styles.darkButton;
  const buttonTextStyle = theme === 'light' ? styles.lightButtonText : styles.darkButtonText;
  
  const logoutButtonStyle = theme === 'light' ? styles.lightLogoutButton : styles.darkLogoutButton;
  const logoutButtonTextStyle = theme === 'light' ? styles.lightLogoutButtonText : styles.darkLogoutButtonText;
  const deleteButtonStyle = theme === 'light' ? styles.lightDeleteButton : styles.darkDeleteButton;
  const idTextStyle = theme === 'light' ? styles.lightIdText : styles.darkIdText;

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
              thumbColor={item.b ? '#ffffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item.f}
              value={item.b}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      <Text style={[styles.idText, idTextStyle]}>Zalogowany ID: {userId}</Text> 

      <TouchableOpacity
        style={[styles.button, logoutButtonStyle]}
        onPress={() => {
            logout();
            router.navigate('/login')
          }}
      >
        <Text style={[styles.buttonText, logoutButtonTextStyle]}>Wyloguj</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, deleteButtonStyle]}
        onPress={deleteAccount}
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>USUŃ KONTO</Text>
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
    marginTop: StatusBar.currentHeight || 0,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#151718',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 200,
  },
  lightButton: {
    backgroundColor: '#007bff',
  },
  darkButton: {
    backgroundColor: '#333',
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
    backgroundColor: '#ffaa00',
  },
  darkLogoutButton: {
    backgroundColor: '#cc8800',
  },
  lightLogoutButtonText: {
    color: '#fff',
  },
  darkLogoutButtonText: {
    color: '#f0f0f0',
  },
  lightDeleteButton: {
    backgroundColor: '#880000', 
    marginTop: 20,
  },
  darkDeleteButton: {
    backgroundColor: '#550000',
    marginTop: 20,
  },
  idText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  lightIdText: {
    color: '#333',
  },
  darkIdText: {
    color: '#ccc',
  }
});