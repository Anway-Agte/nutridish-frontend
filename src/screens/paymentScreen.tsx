import {StyleSheet,Linking, AppState} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Layout, Spinner, Text } from '@ui-kitten/components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { verifyPaymentLink } from '../api'

export const PaymentScreen = (props:any) => {
    const appState = useRef(AppState.currentState) 
    const [appStateVisible, setAppStateVisible] = useState(appState.current); 
    const [buttonClicked, setbuttonClicked] = useState<boolean>(false);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            subscription.remove();
        };

      }, []);

      const _handleAppStateChange = (nextAppState:any) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            console.log('here');

                const body = {
                    paymentId:props.route.params.payment.data.payment_id
                }

                AsyncStorage.getItem('jwt')
                .then(val=>{
                    if(val){
                    verifyPaymentLink(body,val)
                    .then(res => {
                        console.log(res)
                        if(res.success){
                            props.navigation.navigate('Confirmation',{order:res})
                            console.log(res);
                        }
                    })
                    .catch(
                        err=>console.log(err)
                    )
                    }
                })
                .catch(err=>console.log(err))
        }
    
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      };
    return (
        <Layout style={styles.container}>
            <Text category='h6' status='warning' style={{marginBottom:25}}>Your payment has been initiated, please click on the button below to complete your payment</Text>
            <Spinner size='giant'/>
            <Button 
                onPress={()=>{
                    setbuttonClicked(true)
                    Linking.openURL(props.route.params.payment.data.payment_url)}}
                status='info' 
                style={{marginTop:50}}>
                OPEN IN UPI APP
            </Button>
            <Text status='danger' style={{marginTop:50}}>Please do not press the back button until payment is complete </Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:24
    }
})