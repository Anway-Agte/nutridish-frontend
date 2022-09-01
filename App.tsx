import { NavigationContainer } from '@react-navigation/native';
import { createTheme } from '@rneui/themed';
import { ThemeProvider } from '@rneui/themed/dist/config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { AppNavigator } from './src/navigation';


const myTheme = createTheme({
  lightColors: {
    primary: '#a4e2f5',
  }, 
  components: {
    Button : {
      raised: true, 
    }
  }
});


export default function App() {
  return (
    <ThemeProvider theme={myTheme}>
       <AppNavigator/>
      <StatusBar style="dark" />
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
