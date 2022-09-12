import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/homeScreen";
import Constants from 'expo-constants';
import { useTheme } from "@rneui/themed";
import { FormScreen } from "../screens/formScreen";
import { ConfirmationScreen } from "../screens/confirmationScreen";

const Stack = createNativeStackNavigator(); 

export const HomeNavigator = () => {
    const theme = useTheme()
    return (
        <Stack.Navigator
        screenOptions={{
            contentStyle:{
                marginTop: Constants.statusBarHeight, 
            }
        }}
        >
            <Stack.Screen options={{headerShown : false}}  name="Home" component={HomeScreen}/>
            <Stack.Screen options={{headerShown : false}}  name="Form" component={FormScreen}/>
            <Stack.Screen options={{headerShown : false}}  name="Confirmation" component={ConfirmationScreen}/>
        </Stack.Navigator>
    )
}