import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';

import { Exercise, exerciseList } from '@/app/exercises';
import { plans } from '@/app/plans';

type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export default function HomeScreen() {
  const [dayExercises, setDayExercises] = useState<{ [date: string]: Exercise[] }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddList, setShowAddList] = useState(false);
  const [showAddPlanList, setShowAddPlanList] = useState(false);

  const onDayPress = (day: Day) => {
    setSelectedDate(day.dateString);
    setShowAddList(false);
    setShowAddPlanList(false);
    setModalVisible(true);
  };

  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedDate) return;
    setDayExercises(prev => {
      const dayList = prev[selectedDate] || [];
      if (!dayList.find(e => e.name === exercise.name)) {
        return { ...prev, [selectedDate]: [...dayList, exercise] };
      }
      return prev;
    });
    setShowAddList(false);
    setShowAddPlanList(false);
  };

  const handleRemoveExercise = (exerciseName: string) => {
    if (!selectedDate) return;
    setDayExercises(prev => {
      const dayList = prev[selectedDate] || [];
      return { ...prev, [selectedDate]: dayList.filter(e => e.name !== exerciseName) };
    });
  };

  const getMarkedDates = () => {
    const marks: { [key: string]: any } = {};
    for (const date in dayExercises) {
      if (dayExercises[date].length > 0) {
        marks[date] = { marked: true, selected: true, selectedColor: '#00adf5' };
      }
    }
    return marks;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/gym.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ScrollView>
          <Text style={{ fontSize: 30, color: 'white' }}>Witaj w Gym Tracker!</Text>
          <Text style={styles.stepContainer}>
            Kalendarz ćwiczeń
          </Text>

          <View style={{ marginTop: 20, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <Calendar onDayPress={onDayPress} markedDates={getMarkedDates()} />
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Ćwiczenia na {selectedDate}</Text>

                {!showAddList && !showAddPlanList && (
                  <>
                    <ScrollView style={{ maxHeight: 200, width: '100%' }}>
                      {(dayExercises[selectedDate || ''] || []).map((ex, idx) => (
                        <View key={idx} style={styles.exerciseRow}>
                          <Text style={styles.exerciseItem}>• {ex.name} — {ex.sets}×{ex.reps} a</Text>
                          <TouchableOpacity onPress={() => handleRemoveExercise(ex.name)}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Usuń ❌</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      {(dayExercises[selectedDate || ''] || []).length === 0 && (
                        <Text style={{ color: '#999', fontStyle: 'italic' }}>Brak ćwiczeń</Text>
                      )}
                    </ScrollView>

                    <TouchableOpacity
                      style={[styles.modalButton, { marginTop: 10 }]}
                      onPress={() => setShowAddList(true)}
                    >
                      <Text style={styles.modalButtonText}>Dodaj ćwiczenie ➕</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, { marginTop: 5 }]}
                      onPress={() => setShowAddPlanList(true)}
                    >
                      <Text style={styles.modalButtonText}>Dodaj ćwiczenia z planu 📋</Text>
                    </TouchableOpacity>
                  </>
                )}

                {showAddList && (
                  <ScrollView style={{ maxHeight: 250, width: '100%' }}>
                    {exerciseList.map((ex, idx) => (
                      <TouchableOpacity key={idx} style={styles.modalButton} onPress={() => handleAddExercise(ex)}>
                        <Text style={styles.modalButtonText}>{ex.name} — {ex.sets}×{ex.reps} </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: 'red', marginTop: 5 }]}
                      onPress={() => setShowAddList(false)}
                    >
                      <Text style={styles.modalButtonText}>Anuluj ❌</Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}

                {showAddPlanList && (
                  <ScrollView style={{ maxHeight: 250, width: '100%' }}>
                    {plans.map((plan, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.modalButton}
                        onPress={() => {
                          plan.exercises.forEach(ex => handleAddExercise(ex));
                          setShowAddPlanList(false);
                        }}
                      >
                        <Text style={styles.modalButtonText}>{plan.name}</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: 'red', marginTop: 5 }]}
                      onPress={() => setShowAddPlanList(false)}
                    >
                      <Text style={styles.modalButtonText}>Anuluj ❌</Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>Zamknij ❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepContainer: { gap: 8, marginBottom: 8, color: 'white', fontSize: 20 },
  reactLogo: { height: '100%', width: '100%', bottom: 0, left: 0, position: 'static', objectFit: 'fill', },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: 320, backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalButton: { backgroundColor: '#00adf5', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, marginVertical: 3, width: '100%', alignItems: 'center' },
  modalButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalClose: { marginTop: 10 },
  exerciseItem: { fontSize: 16, flexShrink: 1 },
  exerciseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, flexWrap: 'wrap' },
});
