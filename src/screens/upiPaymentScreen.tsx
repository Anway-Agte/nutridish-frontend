import { View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import React from 'react'
import { Button, Image, Text } from '@rneui/themed'
import * as Clipboard from 'expo-clipboard'
import { Feather, AntDesign } from '@expo/vector-icons';
import { book } from '../api';

export const UpiPaymentScreen = (props:any) => {
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('8408083366@ybl');
        // result{
        //     ToastAndroid.showWithGravity('Copied to Clipboard', ToastAndroid.SHORT)
        // }
    }

    const confirmPayment = () => {
        book({...props.route.params.body,paymentMode:'UPI'})
        .then(
            props.navigation.navigate('Confirmation',{date:props.route.params.date})
        )
        .catch(
            err => console.log('There was an unexpected error')
        )
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/qr.jpg')} 
                containerStyle={styles.image}    
            />
            <Text style={{paddingHorizontal:20,color:'red',marginTop:10, fontSize:14}}>
               *  Please make use of the QR code or the UPI Id to make a payment of Rs. 25 from your UPI App and Confirm your payment below * 
            </Text>
            <TouchableOpacity 
                style={
                    {   marginTop:20,
                        borderRadius:16,
                        borderWidth:1,
                        borderColor:'#ddd',
                        padding:16,
                        flexDirection:'row'
                    }} 
                onPress={()=>
                copyToClipboard()
                .then(res=>ToastAndroid.showWithGravity('Copied to Clipboard',ToastAndroid.SHORT,ToastAndroid.CENTER)
                )
                .catch(err=>{})}>
                <Text style={{marginRight:8}}>UPI ID : 8408083366@ybl</Text>
                <Feather name="copy" size={24} color="black" />
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:20, paddingHorizontal:20}}>
            <Button 
                containerStyle={{flex:1, height:50, borderRadius:16,marginRight:5}} 
                buttonStyle={{borderRadius:16,width:'100%',height:'100%'}} 
                onPress={()=>props.navigation.goBack()}
                color='primary' 
            >
                <AntDesign name="arrowleft" size={22} color="white" />
                Cash on Delivery
            </Button>
            <Button 
                containerStyle={{flex:1, height:50, borderRadius:16,marginLeft:5}} 
                buttonStyle={{borderRadius:16,width:'100%',height:'100%'}}  
                onPress={()=>confirmPayment()} 
                color='secondary' 
                title='Confirm Payment'
            />
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        aspectRatio: 1,
        width: '90%',
    }
})