import {View, StyleSheet, ImageBackground, Image, AppState} from 'react-native';
import {Button, Card, IndexPath, Layout, List, ListItem, Select, SelectItem, Spinner, Text} from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { book, generatePaymentLink } from '../api';
import * as Linking from 'expo-linking';


export const Header = (props:any) => (
    <View {...props}>
        <Text category='h6' status='info' >Today's Menu Contains</Text>
    </View>
)

const renderItem = ({ item, index }:any) => (
    <ListItem title={`${item.title} ${index + 1}`}/>
  );

export const HomeScreen  = (props:any) => {

    // const isFocused = useIsFocused();

    // useEffect(() => {
    //     console.log(isFocused);
    // }, [isFocused])
    
    const appState = useRef(AppState.currentState) 

    const [quantity, setquantity] = useState<number>(1);

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    const [paymentInProgress, setpaymentInProgress] = useState<boolean>(false);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);

    // useEffect(() => {
    //     const subscription = AppState.addEventListener("change", _handleAppStateChange);
    //     return () => {
    //       subscription.remove();
    //     };
    //   }, []);
    
    //   const _handleAppStateChange = (nextAppState:any) => {
    //     console.log(appState);
    //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
    //       console.log('App has come to the foreground!');
    //     }
    
    //     appState.current = nextAppState;
    //     setAppStateVisible(appState.current);
    //     console.log('AppState', appState.current);
    //   };
    const [date,setDate] = useState(new Date());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(()=>{
        var timer = setInterval(()=>setDate(new Date()),1000); 


        return function cleanup(){
            clearInterval(timer); 
        }
    }) 

    useEffect(() => {
        setSelectedIndex(new IndexPath(0))
    }, []);

    const bookApi = () => {
        const body = {
            quantity: selectedIndex.row+1,
            paymentMode: 'Pay On Delivery', 
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        } 
        setpaymentInProgress(true)
        AsyncStorage.getItem('jwt')
        .then(value=>{
            if(value){
            book(body,value)
            .then(
                res => {
                    setpaymentInProgress(false)
                    props.navigation.navigate('Confirmation',{order:res})
                }
            )
        }
        })
        .catch(err=>setpaymentInProgress(false))
    } 

    const generateLink = () => {
        const body = {
            amount:selectedIndex.row + 1,
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        }
        setpaymentInProgress(true)
        AsyncStorage.getItem('jwt').then(
            value=>{
                if(value){
                generatePaymentLink(body,value)
                .then(res=>
                    {   
                        setpaymentInProgress(false);
                        props.navigation.navigate('Payment',{payment:res})
                    }) 
                .catch(err=>{
                    console.log(err);
                })
                }
            }
        )
        .catch(err=>{
            setpaymentInProgress(false)
        })
    }

    return(
        <Layout style={styles.container}>


            <Image
                source={require('../../assets/logo.png')}
                resizeMode='contain'
                style={{
                    width:'100%',
                    height:'30%'
                }}
            />
            <Layout style={styles.row}>
                <Select
                    style={styles.input}
                    label='Quantity'
                    value={`${selectedIndex.row + 1}`}
                    placeholder={'Quantity'}
                    selectedIndex={selectedIndex}
                    onSelect={(index:any) => setSelectedIndex(index)}
                    disabled={paymentInProgress}
                >
                    {
                        [
                            ...Array(10)
                          ].map((value:number,index: number) => (
                            <SelectItem title={index + 1} key={index} />
                          ))
                    }
                </Select>
            </Layout>
            <Layout style={styles.row}>
                <Button
                    status='success'
                    style={{
                        margin:6,
                        flex:1
                    }}
                    size='medium'
                    appearance='outline'
                    disabled={paymentInProgress}
                    onPress={()=>generateLink()}
                >
                    UPI Payment     
                </Button>
            </Layout>
            <Layout style={styles.row}>
                <Button
                    status='info'
                    style={{
                        margin:6,
                        flex:1
                    }}
                    size='medium'
                    appearance='outline'
                    disabled={paymentInProgress}
                    onPress={()=>bookApi()}
                >
                    Cash on Delivery    
                </Button>
            </Layout>
            <Layout style={{...styles.row,width:'80%'}}>
            <Text appearance='hint'>
                *** An order placed right now will be delivered on
            <Text status='danger' >
            {
                date.getHours() < 11 ? ` ${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
                :` ${days[new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDay()]}, ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate()}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()+1}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()} `
                } 
                </Text>
                by
                <Text status='info' >
                 {` 12:15 PM`}
                </Text>
                ***
            </Text>
            </Layout>
            {
                paymentInProgress ? <Spinner style={styles.loading} /> : <></>
            }
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
    card: {
        margin: 10,
        borderRadius:24,
        height:'50%',
        padding:0
      },
    list:{
        width:'100%'
    }, 
    row:{
        flexDirection:'row',
        backgroundColor:'#EDF1F7',
        alignContent:'center',
        width:'40%',
        marginVertical:10
        
    }, 
    input:{
        flex:1,
    }, 
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})