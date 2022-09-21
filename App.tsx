import { NavigationContainer } from '@react-navigation/native';
import { createTheme } from '@rneui/themed';
import { ThemeProvider } from '@rneui/themed/dist/config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/navigation';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useEffect } from 'react';
import { UserContextProvider } from './src/contexts';

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
    <UserContextProvider>
    <ApplicationProvider {...eva} theme={eva.light}>
       <AppNavigator/>
      <StatusBar style="dark" />
    </ApplicationProvider>
    </UserContextProvider>
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
