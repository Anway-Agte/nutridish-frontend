import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text,Image} from '@rneui/themed';
import { Button } from "@rneui/themed";

const img = {uri:"../../assets/bgimg.jpg"}

export const HomeScreen  = (props:any) => {
return(
            <ImageBackground source={require('../../assets/bgimg.jpg')} resizeMode='cover' style={styles.container} >
            {/* <Text style={{marginTop: 50, marginLeft:2}} h2>Nutri Dish</Text>
            <Text style={{marginTop:20, marginBottom:40}}>Lorem ipsumas dolor sit amet consectetur adipisicing elit. Temporibus aperiam quia impedit cupiditate dolore neque nihil natus, reprehenderit necessitatibus sit provident. Tempora quo, autem modi quibusdam sit maxime laboriosam aliquid?</Text> */}
            <Button containerStyle={{width:'78%', height:50, borderRadius:16,marginTop:210}} buttonStyle={{borderRadius:16,width:'100%',height:'100%'}}  onPress={()=>{props.navigation.navigate('Form')}} color='error' title='BOOK A NUTRI DISH !'></Button>
            </ImageBackground>

)
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        paddingHorizontal: 4, 
        alignItems:'center',
        justifyContent:'center'
    }
})