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
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <UserContextProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator/>
          <StatusBar style="dark" />
        </ApplicationProvider>
      </UserContextProvider>
      </PersistGate>
    </Provider>
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
