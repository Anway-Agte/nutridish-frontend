import { StyleSheet,Image, View } from "react-native"
import { Button, Card, Layout, Text } from "@ui-kitten/components"
import { useEffect } from "react";


const Header = (props:any) => (
  <View style={{flex:1,alignItems:'center', justifyContent:'center'}} {...props}>
    <Text 
      status="success" category='h6'>
      ORDER CONFIRMATION</Text>
  </View>
); 

const Footer = (props:any) => (
  <View {...props}>
    <Text status="info">Your order has been confirmed with </Text>
    <Text status="info">Order ID : <Text  category='h6'>{props.id}</Text></Text>
    <Text status="danger">Your order will be delivered on {props.date} by 12:15 PM</Text>
    <Text appearance="hint">Please show this QR during the time of delivery</Text>
  </View>
);

export const ConfirmationScreen = (props:any) => {

  useEffect(() => {
    // console.log(props.route.params.order.data.booking)
  }, []);

    return(
        <Layout style={styles.container}>
            <Card status="success" footer={(prop:any)=>
              <Footer {...prop} 
                id={props.route?.params?.order?.data?.booking?._id}
                date={props.route?.params?.order?.data?.booking?.date}
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
      height:300,
      width:300
    }
})