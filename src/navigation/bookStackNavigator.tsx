import React from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/homeScreen';
import Constants from 'expo-constants';
import { ConfirmationScreen } from '../screens/confirmationScreen';
import { PaymentScreen } from '../screens/paymentScreen';
import { TransactionFailed } from '../screens/transactionFailed';

const Stack = createNativeStackNavigator(); 

export const BookStackNavigator = () => {

  

  return (
    <Stack.Navigator
        screenOptions={{
            contentStyle:{
                
            },
            headerShown:false
        }
    }
        initialRouteName="Home"
    >
        <Stack.Screen
            name='Home'
            component={HomeScreen}

        />
        <Stack.Screen
            name='Payment'
            component={PaymentScreen}
            options={{
                navigationBarHidden:true
            }}
        />
        <Stack.Screen
            name='Confirmation'
            component={ConfirmationScreen}
            options={{
                navigationBarHidden:true,

            }}
        />
        <Stack.Screen
            name='Failed'
            component={TransactionFailed}
        />
    </Stack.Navigator>
  )
}
