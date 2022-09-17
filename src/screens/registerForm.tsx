import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'


export const RegisterForm = () => {
    
    const [mobile, setmobile] = useState<string>('');


    return (
        <View
            style={styles.container}
        >
{/*         
            <Card
                containerStyle={styles.cardContainer}
            >
            <Card.Title>
                REGISTER TO CONTINUE
            </Card.Title>
            <Card.Divider/>
            <View>
            <Input
                labelStyle={styles.label}
                label="Mobile Number"
                keyboardType='numeric'
                maxLength={10}
                inputContainerStyle={{borderBottomWidth:0}} 
                style={styles.input}
                onChangeText={e=>setmobile(e)}
            />
            <Button
                // disabled={mobile.length!==10}
                color='secondary'
                containerStyle={styles.button}
                title={'REQUEST OTP'}
                style={styles.button}
            />
            </View>


            </Card> */}
        </View>
    )
} 


const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        backgroundColor: '#EBEEF3', 
        borderRadius: 12, 
        fontSize: 14, 
        padding: 10,
        borderWidth:1,
        borderColor:'#ddd',
        flex:1,

    }, 
    cardContainer:{
        height:300,
        width:'80%',
        elevation:20,
        borderRadius:16,
        justifyContent:'center',
    },
    cardView:{
        position:'relative',
        
    }, 
    label: {
        textTransform: 'capitalize',
        marginBottom:10,
        marginLeft:8,
        fontWeight:'100',
        fontSize:14,
        color:'#454545'
    },
    button:{
        borderRadius:16,
    }
})
