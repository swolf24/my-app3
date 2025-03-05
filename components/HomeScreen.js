import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput, Modal, Portal, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';
import ExerciseList from './ExerciseList';
import SportSelector from './SportSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, DateTimePickerAndroid } from 'react-native';

export default function HomeScreen() {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedSport, setSelectedSport] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getTotalDistance = (sport) => {
    return exercises
      .filter(ex => ex.sport === sport)
      .reduce((sum, ex) => sum + parseFloat(ex.distance), 0)
      .toFixed(2);
  };

  const getTotalAllDistances = () => {
    return exercises
      .reduce((sum, ex) => sum + parseFloat(ex.distance), 0)
      .toFixed(2);
  };

  const addExercise = () => {
    if (selectedSport && distance && duration) {
      const newExercise = {
        id: Date.now(),
        sport: selectedSport,
        distance: parseFloat(distance),
        duration: parseInt(duration),
        date: date,
      };
      setExercises([...exercises, newExercise]);
      setDistance('');
      setDuration('');
      setSelectedSport(null);
    }
  };

  return (
    <ScrollView 
    contentContainerStyle={styles.scrollContainer}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={true}
    keyboardDismissMode="on-drag"
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Exercise Tracker</Text>
          <MaterialCommunityIcons name="run" size={40} color="#4B7BF5" />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>
            <MaterialCommunityIcons name="chart-line" size={24} color="#1B2541" />
            {" Total Distances"}
          </Text>
          <View style={styles.summaryContent}>
            <Text style={[styles.summaryText, styles.totalAllDistances]}>
              Total: {getTotalAllDistances()} km
            </Text>
            <Text style={styles.summaryText}>
              <MaterialCommunityIcons name="run" size={24} color="#4B7BF5" />
              {" "}{getTotalDistance('Running')} km
            </Text>
            <Text style={styles.summaryText}>
              <MaterialCommunityIcons name="bike" size={24} color="#4B7BF5" />
              {" "}{getTotalDistance('Cycling')} km
            </Text>
            <Text style={styles.summaryText}>
              <MaterialCommunityIcons name="swim" size={24} color="#4B7BF5" />
              {" "}{getTotalDistance('Swimming')} km
            </Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <MaterialCommunityIcons name="calendar" size={24} color="#4B7BF5" />
          <Text style={styles.dateText}>
            Selected Date: {date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <SportSelector
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
          />
          
          <TextInput
            label="Distance (km)"
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="map-marker-distance" />}
          />
          
          <TextInput
            label="Duration (min)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="clock-outline" />}
          />


        <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={[styles.button, styles.dateButton]}
            labelStyle={styles.dateButtonLabel}
            textColor="#4B7BF5"
            icon="calendar"
          >
            Select Date
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
          <Button 
            mode="contained" 
            onPress={addExercise} 
            style={styles.button}
            icon="plus-circle"
          >
            Add Exercise
          </Button>

          <Button 
            mode="outlined"
            onPress={showModal}
            style={styles.button}
            icon="format-list-bulleted"
          >
            Your Exercises
          </Button>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <ExerciseList exercises={exercises} />
          </Modal>
        </Portal>
      </View>
    </ScrollView>
  );
}