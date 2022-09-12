import { View, StyleSheet } from "react-native"
import {Button, Card, Icon, Text} from '@rneui/themed'

export const ConfirmationScreen = (props:any) => {
    return(
        <View style={styles.container}>
          <Card containerStyle={{elevation:10, width:'90%',borderRadius:16}}>
          <Card.Title h3>Order Confirmation</Card.Title>
          <Card.Divider />
          <Card.Title h4 style={{ marginBottom: 10 }}>
          {`Your dish will be delivered on ${props.route.params.date}`}
          </Card.Title>
          <Card.Image
            containerStyle={{borderRadius:16,borderBottomWidth:0}}
            style={{ paddingBottom:4 , height:300, borderRadius:16}}
            resizeMode='stretch'
            source={{uri:'https://res.cloudinary.com/dpp7elupy/image/upload/v1662890116/nutridish/Photo_from_%E0%A4%B5%E0%A5%87%E0%A4%A6_1_ryiboa.jpg'}}
          />
          <Card.Divider/>

          <Button
            color='error'
            // icon={
            // //   <Icon
            // //     name="code"
            // //     color="#ffffff"
            // //     iconStyle={{ marginRight: 10 }}
            // //   />
            // }
            onPress={()=>props.navigation.navigate('Home')}
            containerStyle={{
                borderRadius:16,
                elevation:10
            }}
            buttonStyle={{
              borderRadius: 16,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              paddingVertical:10
            }}
            title="GO BACK TO HOME SCREEN"
          />
        </Card>
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