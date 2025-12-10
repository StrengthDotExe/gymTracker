import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { useAuth } from '@/components/AuthContext';
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
  const { userId, theme } = useAuth();
  const isDark = theme === 'dark';

  const backgroundColor = isDark ? '#151718' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const modalBg = isDark ? '#222' : '#fff';
  const calendarBg = isDark ? '#222' : '#fff';
  const calendarText = isDark ? '#fff' : '#2d4150';

  const [dayExercises, setDayExercises] = useState<{ [date: string]: Exercise[] }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddList, setShowAddList] = useState(false);
  const [showAddPlanList, setShowAddPlanList] = useState(false);
  
  const API_URL = 'http://192.168.56.1:3000';

  useEffect(() => {
    if (!userId) return;
    fetchCalendarData();
  }, [userId]);

  const fetchCalendarData = async () => {
    try {
      const response = await fetch(`${API_URL}/exercises?userId=${userId}`);
      const data: Exercise[] = await response.json();

      const grouped: { [date: string]: Exercise[] } = {};
      data.forEach(ex => {
        if (ex.date) {
          if (!grouped[ex.date]) grouped[ex.date] = [];
          grouped[ex.date].push(ex);
        }
      });
      setDayExercises(grouped);
    } catch (error) {
      console.error("Błąd pobierania kalendarza:", error);
    }
  };

  const onDayPress = (day: Day) => {
    setSelectedDate(day.dateString);
    setShowAddList(false);
    setShowAddPlanList(false);
    setModalVisible(true);
  };

  const handleAddExercise = async (templateExercise: Exercise) => {
    if (!selectedDate || !userId) return;

    const newExercise = {
      name: templateExercise.name,
      sets: templateExercise.sets,
      reps: templateExercise.reps,
      userId: userId,
      date: selectedDate,
    };

    try {
      const res = await fetch(`${API_URL}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExercise),
      });

      if (res.ok) {
        const savedEx = await res.json();
        setDayExercises(prev => ({
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), savedEx]
        }));
        setShowAddList(false);
        setShowAddPlanList(false);
      }
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się zapisać ćwiczenia.");
    }
  };

  const handleRemoveExercise = async (exerciseId?: string) => {
    if (!exerciseId || !selectedDate) return;

    try {
      const res = await fetch(`${API_URL}/exercises/${exerciseId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDayExercises(prev => ({
          ...prev,
          [selectedDate]: prev[selectedDate].filter(e => e.id !== exerciseId)
        }));
      }
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się usunąć ćwiczenia.");
    }
  };

  const getMarkedDates = () => {
    const marks: { [key: string]: any } = {};
    for (const date in dayExercises) {
      if (dayExercises[date].length > 0) {
        marks[date] = { marked: true, dotColor: '#00adf5' };
      }
    }
    if (selectedDate) {
      marks[selectedDate] = { ...marks[selectedDate], selected: true, selectedColor: '#00adf5' };
    }
    return marks;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/gym.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={[styles.titleContainer, { backgroundColor }]}>
        <ScrollView>
          <Text style={{ fontSize: 30, color: textColor, marginBottom: 10 }}>Witaj w Gym Tracker!</Text>
          <Text style={[styles.stepContainer, { color: textColor }]}>
            Kalendarz ćwiczeń
          </Text>

          <View style={{ marginTop: 20, backgroundColor: calendarBg, borderRadius: 10, padding: 10 }}>
            <Calendar 
              onDayPress={onDayPress} 
              markedDates={getMarkedDates()}
              key={isDark ? 'dark' : 'light'}
              theme={{
                calendarBackground: calendarBg,
                dayTextColor: calendarText,
                textDisabledColor: isDark ? '#444' : '#d9e1e8',
                monthTextColor: calendarText,
                arrowColor: isDark ? '#00adf5' : 'blue',
                todayTextColor: '#00adf5',
              }}
            />
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContainer, { backgroundColor: modalBg }]}>
                <Text style={[styles.modalTitle, { color: textColor }]}>Ćwiczenia na {selectedDate}</Text>

                {!showAddList && !showAddPlanList && (
                  <>
                    <ScrollView style={{ maxHeight: 200, width: '100%' }}>
                      {(dayExercises[selectedDate || ''] || []).map((ex, idx) => (
                        <View key={ex.id || idx} style={styles.exerciseRow}>
                          <Text style={[styles.exerciseItem, { color: textColor }]}>• {ex.name} — {ex.sets}×{ex.reps}</Text>
                          <TouchableOpacity onPress={() => handleRemoveExercise(ex.id)}>
                            <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 10 }}>Usuń ❌</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      {(dayExercises[selectedDate || ''] || []).length === 0 && (
                        <Text style={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>Brak ćwiczeń</Text>
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
                      style={[styles.modalButton, { backgroundColor: '#880000', marginTop: 5 }]}
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
                      style={[styles.modalButton, { backgroundColor: '#880000', marginTop: 5 }]}
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
  titleContainer: { padding: 20 },
  stepContainer: { gap: 8, marginBottom: 8, fontSize: 20 },
  reactLogo: { height: '100%', width: '100%', bottom: 0, left: 0, position: 'absolute' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: 320, borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalButton: { backgroundColor: '#00adf5', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, marginVertical: 3, width: '100%', alignItems: 'center' },
  modalButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalClose: { marginTop: 15, padding: 5 },
  exerciseItem: { fontSize: 16, flexShrink: 1 },
  exerciseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, width: '100%' },
});