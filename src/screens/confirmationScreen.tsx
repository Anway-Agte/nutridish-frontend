import { View, StyleSheet } from "react-native"
import {Text} from '@rneui/themed'

export const ConfirmationScreen = (props:any) => {
    return(
        <View style={styles.container}>
            <Text h2Style={{color:'red'}} h2>{`Your dish will be delivered on \n ${props.route.params.date}`} </Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        paddingHorizontal:6,
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
})