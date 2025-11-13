import { exerciseList } from '@/app/exercises';
import { ExercisePlan, plans as initialPlans } from '@/app/plans';
import { ThemedView } from '@/components/themed-view';

import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ItemProps = { title: string; message: string };

const Item = ({ title, message }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.stats}>{message}</Text>
  </View>
);

export default function ModalScreen() {
  const [plans, setPlans] = useState(initialPlans);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const toggleExercise = (name: string) => {
    setSelectedExercises(prev =>
      prev.includes(name)
        ? prev.filter(e => e !== name)
        : [...prev, name]
    );
  };

  const addNewPlan = () => {
    const chosenExercises = exerciseList.filter(e => selectedExercises.includes(e.name));

    const newPlan: ExercisePlan = {
      name: newPlanName || "Nowy plan",
      exercises: chosenExercises,
    };

    setPlans([...plans, newPlan]);

    // Reset
    setNewPlanName("");
    setSelectedExercises([]);
    setModalVisible(false);
  };

  const data = plans.map((plan, index) => ({
    id: index.toString(),
    title: plan.name,
    message: plan.exercises.map(e => `${e.name}: ${e.sets}x${e.reps}`).join("\n"),
  }));

  return (
    <ThemedView style={styles.container}>

      {/* ---------- LISTA PLANÓW ---------- */}
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} message={item.message} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* ---------- PRZYCISK DODAWANIA ---------- */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Dodaj plan ćwiczeń</Text>
      </TouchableOpacity>

      {/* ---------- MODAL ---------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalWindow}>

            <Text style={styles.modalTitle}>Nowy plan</Text>

            <TextInput
              placeholder="Nazwa planu"
              placeholderTextColor="#aaa"
              value={newPlanName}
              onChangeText={setNewPlanName}
              style={styles.input}
            />

            <Text style={styles.modalSubtitle}>Wybierz ćwiczenia:</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {exerciseList.map((ex, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => toggleExercise(ex.name)}
                  style={[
                    styles.exerciseBox,
                    selectedExercises.includes(ex.name) && styles.exerciseSelected
                  ]}
                >
                  <Text style={styles.exerciseText}>
                    {ex.name} ({ex.sets}x{ex.reps})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Przyciski modalowe */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={addNewPlan}>
                <Text style={styles.saveText}>Zapisz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Anuluj</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

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
    borderRadius: 12,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  stats: {
    fontSize: 14,
    color: 'white',
    marginTop: 8,
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWindow: {
    width: '85%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 22,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  exerciseBox: {
    padding: 12,
    backgroundColor: '#333',
    marginTop: 6,
    borderRadius: 10,
  },
  exerciseSelected: {
    backgroundColor: '#4CAF50',
  },
  exerciseText: {
    color: 'white',
    fontSize: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#880000',
    padding: 12,
    borderRadius: 10,
    width: '48%',
  },
  saveText: { textAlign: 'center', color: 'white', fontWeight: 'bold' },
  cancelText: { textAlign: 'center', color: 'white', fontWeight: 'bold' },
});
