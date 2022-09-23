import { StyleSheet, View, Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getOrderHistory } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Card, Layout, List, Text, Modal, Spinner } from '@ui-kitten/components'
import { UserContext } from '../contexts'


const renderItemHeader = (headerProps:any, order:any) => (
    <View {...headerProps}>
      <Text category='h6'>
        Order ID: {order.item._id + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps:any, order:any) => 
{  
    const [visible, setVisible] = useState(false);
    
    return(
    <Layout {...footerProps}>
    <Button 
        onPress={()=>setVisible(true)}
        style={{width:'40%'}} status='info' >
        Open QR Code
    </Button>
    <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
            <Image
              style={styles.qr}
              resizeMode="cover"
              source={{
                uri:order.item.qr
              }}
              
              />
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>
    </Layout>
  )}

const renderItem = (order:any) => {


    return(
    <Card
      style={styles.item}
      status='info'
      header={headerProps => renderItemHeader(headerProps, order)}
      footer={footerProps => renderItemFooter(footerProps,order)}>
      <Text>
         Order Placed on: {order.item.date}
      </Text>
      <Text>
        Amount : ₹ {order.item.quantity*25}
      </Text>
      <Text>
         Payment Mode: {order.item.paymentMode}
      </Text>
      <Text>
         Delivery Status : <Text status={order.item.isDelivered?'success':'danger'}>{order.item.isDelivered ? 'Delivered' : 'Not Delivered'}</Text>
      </Text> 
      {
        order.item.isDelivered ? 
        <Text>
        Delivered On : {order.item.deliveredOn} 
        </Text> 
        : <></>
      }
    </Card>
  )};


export const OrderHistory = () => {

    const [loading, setloading] = useState<boolean>(true);
    const [orders, setorders] = useState<any>([]);
    const {user,updateUser} = useContext(UserContext)
    
    useEffect(() => {
        
        AsyncStorage.getItem('jwt')
        .then(value => {
            if(value){
            getOrderHistory(value)
            .then(
                res => {
                    setorders([...res.data])
                    setloading(false)
                }
            )
            .catch(err=>{})    
        }
        })
        .catch(err=>{})

    }, [])
    
    const data = new Array(8).fill({
        title: 'Item',
      });
    
    return (
        <Layout style={styles.container}>
        {    
            loading ? 
            <Spinner>

            </Spinner>
            :
            <List
                style={styles.Listcontainer}
                contentContainerStyle={styles.contentContainer}
                data={orders}
                renderItem={renderItem}
            />}
            <Button 
                onPress={()=>{
                    AsyncStorage.removeItem('jwt')
                    .then(res=>{
                      console.log(res);
                      AsyncStorage.removeItem('user').then(
                        res=>{}
                      ).
                      catch(err=>{})
                    })
                    .catch(err=>{})
                    updateUser({})
                }} 
                
                appearance='ghost' status='danger' style={{marginTop: 12}}>
                LOG OUT
            </Button>
        </Layout>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#dff5f7'
    }, 
    item: {
        marginVertical: 4,
      },
      contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
    Listcontainer:{
        maxHeight:600,
        backgroundColor:'#dff5f7'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      qr:{
        height:300,
        width:300
      }
})