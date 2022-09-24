import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { FormScreen } from "../screens/formScreen";
import { RegisterForm } from "../screens/registerForm";

const Stack = createNativeStackNavigator(); 

export const AuthStackNavigator = () => {

    const isLoggedIn = useSelector((state:any) => state.isLoggedIn);


    return(
        <Stack.Navigator
        screenOptions={{
            contentStyle:{
                marginTop: Constants.statusBarHeight,
                backgroundColor:'#dff5f7' 
            }
        }}
        initialRouteName={isLoggedIn?"Form":"Register"}
        >
            <Stack.Screen 
                options={{headerShown:false}}
                name='Register'
                component={RegisterForm}
            />
            <Stack.Screen 
                options={{headerShown : false}}  
                name="Form" 
                component={FormScreen}
            />
        </Stack.Navigator>
    )
}