import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/homeScreen";
import Constants from 'expo-constants';
import { FormScreen } from "../screens/formScreen";
import { ConfirmationScreen } from "../screens/confirmationScreen";
import {RegisterForm} from '../screens/registerForm';
import { UpiPaymentScreen } from "../screens/upiPaymentScreen";
import { UserContext } from "../contexts";
import { useContext } from "react";
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator(); 

const Tab = createBottomTabNavigator();

const HomeIcon = (props:any) => (
    <Icon {...props} name='star'/>
  );

const BottomTabBar = ({ navigation, state }:any) =>  (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='HOME'/>
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
  );
  

export const HomeNavigator = () => {

    const {user,updateUser} = useContext(UserContext)


    
    return (
        <>
        {
            user.detailsEntered ? 
            <Tab.Navigator
                sceneContainerStyle={{
                    marginTop:Constants.statusBarHeight,
                    backgroundColor:'#dff5f7'
                }}
                screenOptions={{
                    headerShown:false
                }}
                tabBar={props => <BottomTabBar {...props}/>}
                >
                <Tab.Screen name='Home' component={HomeScreen} />
            </Tab.Navigator>
            : 
            <Stack.Navigator
            screenOptions={{
                contentStyle:{
                    marginTop: Constants.statusBarHeight,
                    backgroundColor:'#dff5f7' 
                }
            }}
            initialRouteName="Form"
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
                {/* <Stack.Screen 
                    options={{headerShown : false}}  
                    name="Home" 
                    component={HomeScreen}
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
        }
        </>
    )
}