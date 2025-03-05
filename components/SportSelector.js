import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

export default function SportSelector({ selectedSport, onSelectSport }) {
  const sports = [
    { name: 'Running', icon: 'run' },
    { name: 'Cycling', icon: 'bike' },
    { name: 'Swimming', icon: 'swim' }
  ];

  return (
    <View style={styles.sportSelector}>
      {sports.map((sport) => (
        <Button
          key={sport.name}
          mode={selectedSport === sport.name ? 'contained' : 'outlined'}
          onPress={() => onSelectSport(sport.name)}
          style={styles.sportButton}
          icon={() => (
            <MaterialCommunityIcons 
              name={sport.icon} 
              size={24} 
              color={selectedSport === sport.name ? '#FFFFFF' : '#4B7BF5'} 
            />
          )}
        />
      ))}
    </View>
  );
}