import { StyleSheet, View, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrderHistory } from '../api'
import { Button, Card, Layout, List, Text, Modal, Spinner } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, removeJWT, removeUser } from '../redux/actions/actionCreator'

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
        disabled={order.item.qr?false:true}
        appearance="outline"
        onPress={()=>setVisible(true)}
        style={{width:'41%'}} status='primary' >
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
        Amount : ₹ {order.item.price}
      </Text>
      <Text>
         Payment Mode: {order.item.paymentMode}
      </Text>
      <Text>
         Delivery Status : <Text category='h6' status={order.item.isDelivered?'success':'danger'}>{order.item.isDelivered ? 'Delivered' : 'Not Delivered'}</Text>
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


export const OrderHistory = (props:any) => {

    const [loading, setloading] = useState<boolean>(true);
    const [orders, setorders] = useState<any>([]);
    
    const jwt  = useSelector((state:any) => state.jwt);
    const user = useSelector((state:any) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
      getOrderHistory(jwt)
      .then(
          (res:Orders)=> {
              setorders([...res.data])
              setloading(false)
          }
      )
      .catch(err=>{})   
      
    }, [])
    
    useEffect(() => {
      setloading(true)
      const subscribe = props.navigation.addListener('focus',()=>{

        getOrderHistory(jwt)
        .then(
           (res: Orders) => {
                setorders([...res.data])
                setloading(false)
            }
        )
        .catch(err=>{})    
      }) 

      return subscribe
    }, [props.navigation]);

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
                    dispatch(logoutUser())
                    dispatch(removeJWT())
                    dispatch(removeUser())
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
        minHeight: 280
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