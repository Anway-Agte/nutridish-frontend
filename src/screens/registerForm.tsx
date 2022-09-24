import { View, ImageBackground, StyleSheet, ToastAndroid, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card , Input, Layout, Spinner, Text, } from '@ui-kitten/components';
import { getUser, sendEmailForVerification, SignUserIn } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts';
import { useDispatch } from 'react-redux';
import { addJWT, loginUser, setUser } from '../redux/actions/actionCreator';

export const Header = (props:any) => (
    <View  {...props}>
        <Layout >
        <Image
                source={require('../../assets/logo.png')}
                resizeMode='cover'
                style={{
                    width:120,
                    height:120,
                    alignSelf:'center'
                }}
        />
        </Layout>
      <Text style={{alignSelf:'center'}} category='h6'>{props.text}</Text>
    </View>
  );

export const Footer = (props:any) => {

    const onRequestPress = ()=>{
        if(props.validateEmail()){
            props.sendEmail()
        }
    }

    const onConfirmPress = () => {
        props.verifyOTP()
    }
    
    return(
    <View {...props} style={[props.style, styles.footerContainer]}>
        {
            props.emailSent?(
                <Button
                style={styles.footerControl}
                size='medium'
                status='success'
                onPress={()=>onConfirmPress()}
                disabled={props.otpDisabled}
                accessoryLeft={
                    !props.otpDisabled && props.verifyLoading?
                    LoadingIndicator:<></>
                }
            >
                { !props.otpDisabled && props.verifyLoading?
                    'Verifying OTP':'CONFIRM OTP'}
            </Button>

            ):
                <Button
                style={styles.footerControl}
                size='medium'
                status='info'
                disabled={props.loading}
                onPress={()=>onRequestPress()}
                accessoryLeft={
                    props.loading?
                    LoadingIndicator:<></>
                }
            >
                {props.loading ? 'SENDING OTP' : 'REQUEST OTP'}
            </Button>
            
        }   

    </View>
  )};

const LoadingIndicator = (props:any) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

export const RegisterForm = (props:any) => {
    
    const [email, setemail] = useState<string>('');
    const [emailError, setemailError] = useState<boolean>(false);
    const [emailSent, setemailSent] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);
    const [otp, setotp] = useState('');
    const [otpSent, setotpSent] = useState<string>('');
    const [verifyLoading, setverifyLoading] = useState<boolean>(false);
    const [otpError, setotpError] = useState<boolean>(false);
    const [resendOTP, setresendOTP] = useState<boolean>(false);
    const [timer, settimer] = useState<any>();
    const [time, settime] = useState<number>(9); 
    const {user,updateUser} = useContext(UserContext);

    const dispatch = useDispatch();

    const validEmail = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@moderncoe.edu.in$') 

    useEffect(() => {
        if(time==0){
            clearInterval(timer)
        }
    }, [time])
    

    const validateEmail = () => {
        if(validEmail.test(email)){
            setemailError(false)
            return true
        }else{
            setemailError(true)
            return false 
        }
    } 

    const sendEmail = () => {
        setloading(true);
        setresendOTP(false);
        settime(9)
        sendEmailForVerification(email).then(
            res=>{
                setemailSent(true);
                setloading(false);
                setotpSent(res);
                countDown();
                
            }
        ).catch(err=>{
            setloading(false);
            ToastAndroid.show('Error! Please Try Again',ToastAndroid.SHORT)})
    }

    const verifyOTP = () => {
        setverifyLoading(true);
        SignUserIn({email:email,otp:otp}).
        then(res=>{
            dispatch(addJWT(res.token))
            dispatch(loginUser()) 
            getUser(res.token)
            .then(user=>{
                if(user.detailsEntered){
                    dispatch(setUser(user))
                    setverifyLoading(false)
                }
                else{
                    setverifyLoading(false);
                    ToastAndroid.show('OTP VERIFIED AND ACCOUNT CREATED',ToastAndroid.SHORT)
                    props.navigation.navigate('Form')
                }}
            )

            // AsyncStorage.setItem('jwt',res.token)
            // .then(
            //     r=>{
            //     setverifyLoading(false)
            //     getUser(res.token).then(user=>{
            //         if(user.detailsEntered){
            //             updateUser(user);
            //         }else{
            //             setverifyLoading(false);
            //             ToastAndroid.show('OTP VERIFIED AND ACCOUNT CREATED',ToastAndroid.SHORT)
            //             props.navigation.navigate('Form')
            //         } 
            //     })
            //     .catch(err=>{
            //         setverifyLoading(false)
            //     })        
            //   }
            // )
            
        })
        .catch(
           err=>{
            setverifyLoading(false)
            setotpError(true)
           }
        )
    }

    const countDown = () => {
        
        settimer(setInterval(()=>settime(time=>time-1),1000))
        if(time==0){
            clearInterval(timer)
            setresendOTP(true)
        }
    }

    return (
        <View
            style={styles.container}
        >

            <Card 
                // header={Header} 
                style={styles.card} 
                status='success'
                header={({...props})=><Header {...props} text='Only For PES MCOE Staff and Students' />}
                footer={(props:any)=>
                    <Footer 
                        {...props} 
                        validateEmail={validateEmail} 
                        sendEmail={sendEmail}
                        emailSent={emailSent}
                        loading={loading}
                        otpDisabled={otp.length!==6}
                        verifyLoading={verifyLoading}
                        verifyOTP={verifyOTP}
                        setverifyLoading={setverifyLoading}
                    />}
            >
                <Layout style={styles.row} level='1'>
                    <Input
                        disabled={emailSent}
                        style={styles.input}
                        placeholder='eg. xyz@moderncoe.edu.in'
                        value={`${email}`}
                        label='Modern Domain Email ID'
                        onChangeText={val=>setemail(val)}
                    />

                </Layout>
                {
                    emailError ? 
                        ( <Text 
                            style={styles.text} 
                            appearance='hint'
                            status='danger'
                            category='c1'
                            
                        >
                                Please Enter a Valid Modern Domain Email Address
                        </Text>)
                    :<></>
                }
                {
                    emailSent ?
                    <>
                     <Text 
                            style={styles.text} 
                            appearance='hint'
                            status='success'
                            category='c1'
                            
                        >
                    An OTP has been sent to the above email address
                    </Text>
                    <Layout style={{...styles.row,marginTop:5}} level='1'>
                    <Input
                        style={styles.input}
                        placeholder='Enter OTP'
                        value={otp}
                        onChangeText={val=>setotp(val)}
                        keyboardType='numeric'
                        maxLength={6}
                        disabled={verifyLoading}
                    />

                    </Layout> 
                    {
                    otpError ? 
                        ( <Text 
                            style={styles.text} 
                            appearance='hint'
                            status='danger'
                            category='c1'
                            
                        >
                                Invalid OTP
                        </Text>)
                    :<></>
                    }
                    {
                        time>0?( 
                        <Text 
                            style={styles.text} 
                            appearance='hint'
                            category='c1'
                            
                        >
                                Resend OTP in {time} seconds
                        </Text>)
                        :
                        <Button 
                        onPress={()=>sendEmail()}
                        style={styles.text} appearance='ghost'>
                        Resend OTP
                      </Button>
                    }
                    </> 
                    : <></>
                }

            </Card>
        </View>
    )
} 


const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center'
    },
    card:{
        elevation: 30,
        width:'80%'
    },
    row:{
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        margin: 1,
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
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
    footerControl: {
        marginHorizontal: 2,
        elevation:2
      },
    text:{
        margin:2
      }, 

    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },
})

