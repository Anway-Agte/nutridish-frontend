import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from 'expo-constants';
import { useEffect } from "react";
import { BottomNavigation, BottomNavigationTab} from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookStackNavigator } from "./bookStackNavigator";
import { OrderHistory } from "../screens/orderHistory";
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

const BottomTabBar = (props:any) =>  (
    <BottomNavigation
      {...props}
      style={{}}
      selectedIndex={props.state.index}
      onSelect={index => props.navigation.navigate(props.state.routeNames[index])}>
      <BottomNavigationTab title='HOME' icon={HomeIcon}/>
      <BottomNavigationTab title='ORDERS' icon={OrderIcon} />
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
  );
  

export const HomeNavigator = () => {

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
    }, [user]);
    
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
                }}
                // tabBar={props => <BottomTabBar {...props}/>}
                >
                <Tab.Screen                     
                    options={{
                        tabBarLabel:'Home',
                        tabBarIcon:HomeIcon
                    }} 
                    name='BookNavigator' component={BookStackNavigator} />
                <Tab.Screen 
                    options={{
                        tabBarLabel:'Orders',
                        tabBarIcon:OrderIcon
                    }} 
                name='Orders' component={OrderHistory} />
            </Tab.Navigator>
            : 
            <AuthStackNavigator/>
        }
        </>
    )
}