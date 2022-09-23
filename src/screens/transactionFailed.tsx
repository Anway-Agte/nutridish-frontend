import { StyleSheet , Image, BackHandler} from 'react-native'
import React, { useEffect } from 'react'
import { Layout , Button} from '@ui-kitten/components'

export const TransactionFailed = (props:any) => {

    useEffect(() => {

        props.navigation.setOptions({tabBarVisible:false})

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


  return (
    <Layout style={styles.container}>
        <Image
        style={styles.failed}
        resizeMode="contain"
        source={require('../../assets/failure.png')}
        />
        <Button 
            onPress={()=>{
                props.navigation.navigate('Home')
            }}
            status='danger'>
            Go Back to Home Screen
        </Button>
    </Layout>
  )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }, 
    failed:{
        height: 300, 
        width:300
    }
})