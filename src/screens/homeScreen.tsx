import {View, StyleSheet, Image, AppState, BackHandler, ToastAndroid} from 'react-native';
import {Button, IndexPath, Layout, ListItem, Select, SelectItem, Spinner, Text} from '@ui-kitten/components';
import {useEffect, useRef, useState } from 'react';
import { book, generatePaymentLink } from '../api';
import { useSelector } from 'react-redux';


export const Header = (props:any) => (
    <View {...props}>
        <Text category='h6' status='info' >Today's Menu Contains</Text>
    </View>
)

const renderItem = ({ item, index }:any) => (
    <ListItem title={`${item.title} ${index + 1}`}/>
  );

export const HomeScreen  = (props:any) => {

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    const [paymentInProgress, setpaymentInProgress] = useState<boolean>(false);
 
    const [date,setDate] = useState(new Date());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const jwt = useSelector((state:any)=> state.jwt);
    const user = useSelector((state:any) => state.user);

    useEffect(()=>{
        var timer = setInterval(()=>setDate(new Date()),1000); 


        return function cleanup(){
            clearInterval(timer); 
        }
    }) 

    useEffect(() => { 
        setSelectedIndex(new IndexPath(0))

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



    const bookApi = () => {
        const body = {
            quantity: selectedIndex.row+1,
            paymentMode: 'Pay On Delivery', 
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        } 
        setpaymentInProgress(true) 

        book(body,jwt)
        .then(
            res => {
                if(res.success){
                setpaymentInProgress(false)
                props.navigation.navigate('Confirmation',{order:res})
                }
                else{
                    setpaymentInProgress(false)
                    ToastAndroid.show(res.message,ToastAndroid.SHORT)
                }
            }
        )
        .catch(
            err => {}
        )
    } 

    const generateLink = () => {
        const body = {
            amount:selectedIndex.row + 1,
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        }
        setpaymentInProgress(true) 

        generatePaymentLink(body,jwt)
        .then(res=>
            {   
                if(res.success){
                setpaymentInProgress(false);
                props.navigation.navigate('Payment',{payment:res})
                }
                else{
                    setpaymentInProgress(false)
                    ToastAndroid.show(res.message,ToastAndroid.SHORT)
                }
            }) 
        .catch(err=>{
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
            <Text status='info' category='h6'>Ordering as {user.isStaff ? 'Staff':'Student'}</Text>
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
            <Text status='danger' category='h6'>Amount to be paid : ₹ {(selectedIndex.row+1)*(user.isStaff?20:25)}</Text>
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
            <Layout style={styles.row}>

            </Layout>
            <Layout style={{...styles.row,width:'80%'}}>
            <Text appearance='hint'>
                *** An order placed right now will be delivered on
            <Text status='danger' category='h6' >
            {
                date.getHours() < 11 ? ` ${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
                :` ${days[new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDay()]}, ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate()}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()+1}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()} `
                } 
                </Text>
                by
                <Text status='info' category='h6' >
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
        width:'80%',
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