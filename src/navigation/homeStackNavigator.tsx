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
import { useSelector } from "react-redux";
import { AuthStackNavigator } from "./authStackNavigator";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator(); 

const Tab = createBottomTabNavigator();

const HomeIcon = (props:any) => (
    <AntDesign name="home" size={24} color="blue" />
  );

const OrderIcon = (props:any) => (
    <MaterialIcons name="history" size={24} color="blue" />
)

const BottomTabBar = ({ navigation, state }:any) =>  (
    <BottomNavigation
      style={{marginBottom:24}}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='HOME' icon={HomeIcon}/>
      <BottomNavigationTab title='ORDERS' icon={OrderIcon} />
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
  );
  

export const HomeNavigator = () => {

    // const {user,updateUser} = useContext(UserContext)

    // const [jwt, setjwt] = useState<string>('');
    const isLoggedIn = useSelector((state:any) => state.isLoggedIn); 
    const user = useSelector((state:any) => state.user);
    const jwt = useSelector((state:any) => state.jwt);

    useEffect(() => {

        // AsyncStorage.getItem('jwt')
        // .then(res=>{
        //     if(res){
        //     // setjwt(res)
        //     }})
        // .catch(err=>{})
    }, []);

    useEffect(() => {
        // console.log(jwt);
    }, [jwt]);
    
    return (
        <>
        {
            user.detailsEntered && jwt && isLoggedIn ? 
            <Tab.Navigator
                backBehavior="history"
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
            <AuthStackNavigator/>
        }
        </>
    )
}