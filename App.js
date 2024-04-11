import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
        
    <Navigation/>
  
    <StatusBar/>
  

  </SafeAreaProvider>
  );
}