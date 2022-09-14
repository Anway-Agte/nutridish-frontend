import { View, StyleSheet, ToastAndroid, TabBarIOS} from "react-native"
import {Button, Image, Input, Text} from '@rneui/themed'
import { useEffect, useState } from "react"
import { book, getBuildings, getDepartments, getFloors } from "../api"
import SelectDropdown from "react-native-select-dropdown"
import * as Linking from 'expo-linking'

export const FormScreen = (props:any) => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [bldg,setBldg] = useState<any>({})
    const [floor, setfloor] = useState<any>({});
    const [room, setroom] = useState('');
    const [department, setdepartment] = useState<any>({});
    const [buildings, setbuildings] = useState<any>([]);
    const [departments, setdepartments] = useState<any>([])
    const [floors, setfloors] = useState<any>([]);

    const [date,setDate] = useState(new Date());

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(()=>{
        var timer = setInterval(()=>setDate(new Date()),1000); 


        return function cleanup(){
            clearInterval(timer); 
        }
    }) 

    useEffect(() => {
        
        getBuildings().then(res => {
            setbuildings(res)
        }).catch(err=>{})

    },[]);

    useEffect(() => {
        getFloors(bldg._id).then(
            res=>{
                setfloors(res)}
        )
    }, [bldg]);

    useEffect(() => {
        getDepartments(floor._id).then(
            res=>setdepartments(res)
        ).catch()
    }, [floor]);

    const validateForm = (body:any) => {
        
        if(!body.name){
            ToastAndroid.show('Please enter a name', ToastAndroid.SHORT)
            return false
        }
        else if(body.contact.length !== 10 || !body.contact){
            ToastAndroid.show('Please enter a valid mobile number', ToastAndroid.SHORT)
            return false
        }
        else if(!body.building || !body.department || !body.floor){
            ToastAndroid.show('Please select all the field values', ToastAndroid.SHORT)
            return false
        }
        else if(!body.room){
            ToastAndroid.show('Please enter a room number',ToastAndroid.SHORT)
            return false
        }
        else{
            return true
        }
    }

    const initializePayment = () => {
        const body = {
            name:name, 
            contact:mobile, 
            building:bldg.name,
            department:department.department,
            floor: floor.floor,
            room: room, 
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        }
        if(validateForm(body)){
            props.navigation.navigate('UPI',{body:body, 
                date: date.getHours() < 11 ? `${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
                : `${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate()}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()+1}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()}` })
        }
    }

    const confirmBooking = () => {
        const body = {
            name:name, 
            contact:mobile, 
            building:bldg.name,
            department:department.department,
            floor: floor.floor,
            room: room, 
            date: date.getHours() < 11 ? date.toDateString() : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString() 
        }

        if(validateForm(body)){

            book({...body,paymentMode:'Pay On Delivery'}).then(res =>
            props.navigation.navigate('Confirmation',{date: date.getHours() < 11 ? `${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
                : `${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate()}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()+1}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()}` 
                })
        ).catch(err => ToastAndroid.show('There was an unexpected error, please try again', ToastAndroid.SHORT) );
            }
    }
    return(
        <View style={styles.container}>

            <Text style={{paddingHorizontal:1}} h4>
                An order placed right now will be delivered on
            </Text>
            <Text style={{marginBottom:10,paddingHorizontal:5}} h4>
            <Text style={{color:'red'}} h4>
            {
                date.getHours() < 11 ? ` ${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
                :` ${days[new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDay()]}, ${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate()}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()+1}/${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()} `
                } 
                </Text>
                by
                <Text h4 style={{color:'#0335ff'}}>
                 {` 12:15 PM`}
                </Text>
            </Text>

            <View style={{flexDirection:'row'}}>
            <Input 
                containerStyle={{flex:1}} 
                inputContainerStyle={{borderBottomWidth:0}} 
                label="Name" 
                onChangeText={text => setName(text)} 
                value={name} 
                style={styles.input} 
                placeholder='Name'
            />
            <Input 
                containerStyle={{flex:1}} 
                inputContainerStyle={{borderBottomWidth:0}} 
                label="Contact" 
                keyboardType="numeric" 
                onChangeText={text => setMobile(text)} 
                value={mobile} 
                inputStyle={styles.input} 
                placeholder='Mobile Number'/>
            </View>
           
            <View style={{flexDirection:'row',paddingHorizontal:2,}}>
            <SelectDropdown 
                defaultButtonText="Select Building"
                buttonStyle={{...styles.dropdown1BtnStyle,flex:1}}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={buildings||[]} 
                onSelect={(selectedItem,index)=>{setBldg(selectedItem)}}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    return item.name
                }}/>
            <SelectDropdown 
                defaultButtonText="Select Floor"
                buttonStyle={{...styles.dropdown1BtnStyle,flex:1}}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                searchInputStyle={{marginVertical:2}}
                data={floors||[]} 
                onSelect={(selectedItem,index)=>{setfloor(selectedItem)}}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return `${selectedItem.floor} Floor`
                }}
                rowTextForSelection={(item, index) => {
                    return `${item.floor} Floor`
                }} 
                disabled={Object.keys(bldg).length == 0}
                />
            </View>
            <SelectDropdown 
                defaultButtonText="Select Department"
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                searchInputStyle={{marginVertical:2}}
                data={departments||[]} 
                onSelect={(selectedItem,index)=>{setdepartment(selectedItem)}}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.department
                }}
                rowTextForSelection={(item, index) => {
                    return item.department
                }} 
                disabled={Object.keys(floor).length == 0}
                />
            <Input 
                inputContainerStyle={{borderBottomWidth:0}} 
                label="Room" 
                keyboardType="numeric" 
                onChangeText={text => setroom(text)} 
                value={room} 
                style={styles.input} 
                placeholder='Room'
            />
            <Button 
                containerStyle={{width:'78%', height:50, borderRadius:16}} 
                buttonStyle={{borderRadius:16,width:'100%',height:'100%'}} 
                onPress={()=>initializePayment()}
                color='primary' 
                title='MAKE UPI PAYMENT'
            />
            <Button 
                containerStyle={{width:'78%', height:50, borderRadius:16, marginTop:10}} 
                buttonStyle={{borderRadius:16,width:'100%',height:'100%'}}  
                onPress={()=>confirmBooking()} 
                color='secondary' 
                title='PAY ON DELIVERY'
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    input: {
        backgroundColor: 'white', 
        borderRadius: 16, 
        fontSize: 14, 
        padding: 10,
        borderBottomColor: '#C5C5C5',
        flex:1
    }, 
    dropdown1BtnStyle: {
        width: '96%',
        height: 45,
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginVertical:6,
        marginHorizontal:2
      },
      dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
      dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
      dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
      dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
})