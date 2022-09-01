import { View, StyleSheet } from "react-native"
import {Button, Input, Text} from '@rneui/themed'
import { useState } from "react"
import { book } from "../api"

export const FormScreen = (props:any) => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')

    const confirmBooking = () => {
        book({name:name, contact:mobile, address:address}).then(
            props.navigation.navigate('Confirmation')
        ).catch(err => console.log(err));
    }
    return(
        <View style={styles.container}>
            <Input keyboardType="numeric" onChangeText={text => setMobile(text)} value={mobile} style={styles.input} placeholder='Mobile Number'/>
            <Input onChangeText={text => setName(text)} value={name} style={styles.input} placeholder='Name'/>
            <Input onChangeText={text => setAddress(text)} value={address} style={styles.input} placeholder='Address'/>
            <Button containerStyle={{width:'96%'}} size='lg' onPress={()=>confirmBooking()} color='secondary' title='Confirm'></Button>
        </View>
    )
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    input: {
        backgroundColor: 'white', 
        borderRadius: 4, 
        fontSize: 14, 
        padding: 10,
        shadowColor:'black',
        elevation: 4
    }
})