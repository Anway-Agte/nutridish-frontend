import { StyleSheet,Image, View, BackHandler } from "react-native"
import { Button, Card, Layout, Text } from "@ui-kitten/components"
import { useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../contexts";
import { patchWebProps } from "@rneui/base";
import { useSelector } from "react-redux";


const Header = (props:any) => (
  <View style={{flex:1,alignItems:'center', justifyContent:'center'}} {...props}>
    <Text 
      status="success" category='h6'>
      ORDER CONFIRMATION</Text>
  </View>
); 

const Footer = (props:any) => (
  <View {...props}>
    <Text status="success" category="h6">ORDER CONFIRMED !</Text>
    <Text status="info">Order ID : <Text  category='h6'>{props.id}</Text></Text>
    {
      props.isStaff ? 
      <Text category="h6" status="danger">Your order will be delivered at your desk on {props.date} by 12:15 PM</Text> 
      :
      <Text category="h6" status="danger">Please collect your order from Open Stage, opposite to MCOE canteen on {props.date} between 12:15 PM and 12:30 PM</Text>
    }
    
    <Text appearance="hint">Please show this QR during the time of delivery</Text>
    <Button 
    onPress={()=>{props.navigate('Home')}}
    style={{marginTop:25}} status='info' > Go Back to Home Screen</Button>
  </View>
);

export const ConfirmationScreen = (props:any) => {

  // const {user,updateUser} = useContext(UserContext);

  const user = useSelector((state:any) => state.user);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    }); 

    return ()=>{
      BackHandler.removeEventListener('hardwareBackPress', () => {
        props.navigation.goBack(null);
        return true;
      });
    }
  }, []);
  
  
    return(
        <Layout style={styles.container}>
            <Card status="success" footer={(prop:any)=>
              <Footer {...prop} 
                id={props.route?.params?.order?.data?.booking?._id}
                date={props.route?.params?.order?.data?.booking?.date}
                navigate={props.navigation.navigate}
                isStaff={user.isStaff}
            />}  style={styles.card}>
              <Image
              style={styles.qr}
              resizeMode="cover"
              source={{
                uri:props.route.params.order.data.qr
              }}
              
              />
            </Card>

        </Layout>
    )
} 

const styles = StyleSheet.create({
    container : {
      flex:1,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#EDF1F7',
    }, 
    card:{
      elevation:20, 
      borderRadius: 24,
      margin:8,
      width:'80%',
      alignItems:'center',
      justifyContent:'center',
    },
    qr:{
      height:200,
      width:200
    }
})