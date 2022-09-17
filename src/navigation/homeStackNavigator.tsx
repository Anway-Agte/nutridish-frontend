import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/homeScreen";
import Constants from 'expo-constants';
import { useTheme } from "@rneui/themed";
import { FormScreen } from "../screens/formScreen";
import { ConfirmationScreen } from "../screens/confirmationScreen";
import {RegisterForm} from '../screens/registerForm';
import { UpiPaymentScreen } from "../screens/upiPaymentScreen";

const Stack = createNativeStackNavigator(); 

export const HomeNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            contentStyle:{
                marginTop: Constants.statusBarHeight,
                backgroundColor:'#dff5f7' 
            }
        }}
        initialRouteName="Register"
        >
            <Stack.Screen 
                options={{headerShown:false}}
                name='Register'
                component={RegisterForm}
            />
            {/* <Stack.Screen 
                options={{headerShown : false}}  
                name="Home" 
                component={HomeScreen}
            />
            <Stack.Screen 
                options={{headerShown : false}}  
                name="Form" 
                component={FormScreen}
            />
            <Stack.Screen 
                options={{headerShown : false}}  
                name="Confirmation" 
                component={ConfirmationScreen}
            />
            <Stack.Screen
                options={{headerShown:false}} 
                name='UPI'
                component={UpiPaymentScreen}
            /> */}
        </Stack.Navigator>
    )
}