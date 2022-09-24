import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/homeScreen";
import Constants from 'expo-constants';
import { FormScreen } from "../screens/formScreen";
import { ConfirmationScreen } from "../screens/confirmationScreen";
import {RegisterForm} from '../screens/registerForm';
import { UserContext } from "../contexts";
import { useContext, useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookStackNavigator } from "./bookStackNavigator";
import { OrderHistory } from "../screens/orderHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator(); 

const Tab = createBottomTabNavigator();

const HomeIcon = (props:any) => (
    <Icon {...props} name='star'/>
  );

const BottomTabBar = ({ navigation, state }:any) =>  (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='HOME' icon={HomeIcon}/>
      <BottomNavigationTab title='ORDERS'/>
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
  );
  

export const HomeNavigator = () => {

    const {user,updateUser} = useContext(UserContext)

    const [jwt, setjwt] = useState<string>('');


    useEffect(() => {
        AsyncStorage.getItem('jwt')
        .then(res=>{
            if(res){
            setjwt(res)
            }})
        .catch(err=>{})
    }, []);

    useEffect(() => {
        // console.log(jwt);
    }, [jwt]);
    
    return (
        <>
        {
            user.detailsEntered  ? 
            <Tab.Navigator
                sceneContainerStyle={{
                    marginTop:Constants.statusBarHeight,
                    backgroundColor:'#dff5f7'
                }}
                screenOptions={{
                    headerShown:false,
                    tabBarStyle: { position: 'absolute' },
                }}
                tabBar={props => <BottomTabBar {...props}/>}
                >
                <Tab.Screen                     
                    name='BookNavigator' component={BookStackNavigator} />
                <Tab.Screen name='Orders' component={OrderHistory} />
            </Tab.Navigator>
            : 
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
                <Stack.Screen 
                    options={{headerShown : false}}  
                    name="Form" 
                    component={FormScreen}
                />
                <Stack.Screen 
                    options={{headerShown : false}}  
                    name="Home" 
                    component={HomeScreen}
                />
    
                {/* <Stack.Screen 
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