import { Exercise } from '@/app/exercises';
import { useAuth } from '@/components/AuthContext';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal, StatusBar, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ExploreScreen() {
  const { userId, theme } = useAuth();

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#151718' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const cardColor = isDark ? '#333' : '#f5f5f5';
  const subTextColor = isDark ? '#ccc' : '#666';
  const inputBg = isDark ? '#333' : '#eee';
  const placeholderColor = isDark ? '#999' : '#888';

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const API_URL = 'http://192.168.56.1:3000/exercises'; 

  useEffect(() => {
    if (!userId) return; 

    const fetchExercises = async () => {
      setIsLoading(true); 

      try {
        const response = await fetch(`${API_URL}?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Błąd pobierania danych z serwera. Status: ' + response.status);
        }
        
        const data: Exercise[] = await response.json();
        setExercises(data);

      } catch (error) {
        console.error('Błąd pobierania ćwiczeń:', error);
        Alert.alert("Błąd", "Nie udało się pobrać ćwiczeń z serwera.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [userId]); 

 const addExercise = async () => {
  if (!exerciseName || !exerciseSets || !exerciseReps || !userId) return; 

  setIsLoading(true);

  
  const newExercise = {
    name: exerciseName,
    sets: Number(exerciseSets),
    reps: Number(exerciseReps),
    userId: userId, 
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExercise),
    });

    if (!response.ok) {
      throw new Error('Błąd serwera podczas dodawania ćwiczenia.');
    }

    const savedExercise: Exercise = await response.json();

    setExercises([...exercises, savedExercise]);

    setExerciseName('');
    setExerciseSets('');
    setExerciseReps('');
    setModalVisible(false);

  } catch (error) {
    console.error('Błąd zapisu na serwerze:', error);
    Alert.alert("Błąd", "Nie udało się zapisać ćwiczenia na serwerze.");
  } finally {
    setIsLoading(false);
  }
};

  const deleteExercise = async () => {
  if (!selectedExercise?.id) return;

  try {
    const response = await fetch(`${API_URL}/${selectedExercise.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Błąd serwera podczas usuwania.");
    }

    setExercises(prev => prev.filter(ex => ex.id !== selectedExercise.id));

    setDetailsVisible(false);
    setSelectedExercise(null);

  } catch (error) {
    console.error("Błąd usuwania:", error);
    Alert.alert("Błąd", "Nie udało się usunąć ćwiczenia.");
  }
};

  return (
    <ThemedView style={[styles.container, { backgroundColor: backgroundColor }]}>
      
      <Text style={[styles.header, { color: textColor }]}>Ćwiczenia</Text>

      {isLoading && <Text style={{ color: 'orange', textAlign: 'center', marginBottom: 10 }}>Ładowanie danych...</Text>}

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.exerciseItem, { backgroundColor: cardColor }]}
            onPress={() => {
              setSelectedExercise(item);
              setDetailsVisible(true);
            }}
          >
            <Text style={[styles.exerciseName, { color: textColor }]}>{item.name}</Text>
            <Text style={[styles.exerciseStats, { color: subTextColor }]}>
              {item.sets} x {item.reps}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>Dodaj ćwiczenie</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalWindow, { backgroundColor: cardColor }]}>
            <Text style={[styles.modalTitle, { color: textColor }]}>Nowe ćwiczenie</Text>

            <TextInput
              value={exerciseName}
              onChangeText={setExerciseName}
              placeholder="Nazwa ćwiczenia"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
            />

            <TextInput
              value={exerciseSets}
              onChangeText={setExerciseSets}
              placeholder="Liczba serii"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
            />

            <TextInput
              value={exerciseReps}
              onChangeText={setExerciseReps}
              placeholder="Liczba powtórzeń"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveBtn} onPress={addExercise}>
                <Text style={styles.btnText}>Dodaj</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Anuluj</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={detailsVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.detailsWindow, { backgroundColor: cardColor }]}>
            {selectedExercise && (
              <>
                <Text style={[styles.modalTitle, { color: textColor }]}>{selectedExercise.name}</Text>

                <Text style={[styles.detailText, { color: subTextColor }]}>
                  Ilość serii: <Text style={[styles.detailValue, { color: textColor }]}>{selectedExercise.sets}</Text>
                </Text>

                <Text style={[styles.detailText, { color: subTextColor }]}>
                  Ilość powtórzeń: <Text style={[styles.detailValue, { color: textColor }]}>{selectedExercise.reps}</Text>
                </Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.btnText}>Edytuj</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.deleteBtn} onPress={deleteExercise}>
                    <Text style={styles.btnText}>Usuń</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setDetailsVisible(false)}
                >
                  <Text style={styles.btnText}>Zamknij</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  exerciseItem: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  exerciseName: { fontSize: 20, fontWeight: 'bold' },
  exerciseStats: { marginTop: 5 },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
  },
  addText: { textAlign: 'center', color: 'white', fontSize: 18 },

  modalBg: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWindow: {
    width: '85%',
    padding: 20,
    borderRadius: 20,
  },
  modalTitle: { fontSize: 22, marginBottom: 15 },
  input: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveBtn: {
    width: '48%',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
  },
  cancelBtn: {
    width: '48%',
    backgroundColor: '#880000',
    padding: 12,
    borderRadius: 10,
  },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  detailsWindow: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  detailValue: {
    fontWeight: 'bold',
  },
  editBtn: {
    width: '48%',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
  },
  deleteBtn: {
    width: '48%',
    backgroundColor: '#880000',
    padding: 12,
    borderRadius: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 10,
  },
});