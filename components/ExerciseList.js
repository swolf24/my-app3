import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import styles from '../styles';  

export default function ExerciseList({ exercises }) {
  const getTotalDistance = (sport) => {
    return exercises
      .filter(ex => ex.sport === sport)
      .reduce((sum, ex) => sum + ex.distance, 0)
      .toFixed(2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // ... existing imports and code ...

return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Your Exercises</Text>
      
      <View style={styles.totalSection}>
        <Text style={styles.totalTitle}>Total Distances</Text>
        <Text style={styles.summaryText}>Running: {getTotalDistance('Running')} km</Text>
        <Text style={styles.summaryText}>Cycling: {getTotalDistance('Cycling')} km</Text>
        <Text style={styles.summaryText}>Swimming: {getTotalDistance('Swimming')} km</Text>
      </View>
  
      <ScrollView>
        {exercises.map((exercise) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <Card.Content>
              <Text style={styles.exerciseTitle}>{exercise.sport}</Text>
              <Text style={styles.exerciseDetails}>Date: {formatDate(exercise.date)}</Text>
              <Text style={styles.exerciseDetails}>Distance: {exercise.distance} km</Text>
              <Text style={styles.exerciseDetails}>Duration: {exercise.duration} min</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}