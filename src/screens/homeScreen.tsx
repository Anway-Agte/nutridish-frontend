import {View, StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
import { Button } from "@rneui/themed";

export const HomeScreen  = (props:any) => {
return(
        <View style={styles.container}>
            <Text style={{marginTop: 50, marginLeft:2}} h2>Nutri Plate</Text>
            <Text style={{marginTop:20, marginBottom:40}}>Lorem ipsumas dolor sit amet consectetur adipisicing elit. Temporibus aperiam quia impedit cupiditate dolore neque nihil natus, reprehenderit necessitatibus sit provident. Tempora quo, autem modi quibusdam sit maxime laboriosam aliquid?</Text>
            <Button onPress={()=>{props.navigation.navigate('Form')}} color={'error'} title='Book a NutriPlate'></Button>
        </View>

)
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        paddingHorizontal: 4, 
    
    }
})