import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './components/HomeScreen';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4B7BF5',      // Modern blue color
    accent: '#1B2541',       // Dark blue for contrast
    background: '#F5F5F5',   // Light gray background
    surface: '#FFFFFF',      // White surface
    text: '#1B2541',        // Dark text
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});