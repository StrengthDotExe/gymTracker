import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { exerciseList as defaultExercises, Exercise } from '@/app/exercises';

export default function ExploreScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises);
  const [modalVisible, setModalVisible] = useState(false);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');

  // -------------------------------
  // ADD NEW EXERCISE (RAM ONLY)
  // -------------------------------
  const addExercise = () => {
    if (!exerciseName || !exerciseSets || !exerciseReps) return;

    const newExercise: Exercise = {
      name: exerciseName,
      sets: Number(exerciseSets),
      reps: Number(exerciseReps),
    };

    setExercises([...exercises, newExercise]);

    // Clear form
    setExerciseName('');
    setExerciseSets('');
    setExerciseReps('');
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      
      <Text style={styles.header}>Ćwiczenia</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseStats}>
              {item.sets} x {item.reps}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>Dodaj ćwiczenie</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>Nowe ćwiczenie</Text>

            <TextInput
              value={exerciseName}
              onChangeText={setExerciseName}
              placeholder="Nazwa ćwiczenia"
              placeholderTextColor="#999"
              style={styles.input}
            />

            <TextInput
              value={exerciseSets}
              onChangeText={setExerciseSets}
              placeholder="Liczba serii"
              placeholderTextColor="#999"
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              value={exerciseReps}
              onChangeText={setExerciseReps}
              placeholder="Liczba powtórzeń"
              placeholderTextColor="#999"
              keyboardType="numeric"
              style={styles.input}
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

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  exerciseItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  exerciseName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  exerciseStats: { color: '#ccc', marginTop: 5 },

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
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 20,
  },
  modalTitle: { color: 'white', fontSize: 22, marginBottom: 15 },
  input: {
    backgroundColor: '#333',
    padding: 10,
    color: 'white',
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
});
