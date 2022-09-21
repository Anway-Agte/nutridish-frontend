import { View, StyleSheet, ToastAndroid} from "react-native"
import { useContext, useEffect, useState } from "react"
import { book, fillDetails, getBuildings, getDepartments, getFloors } from "../api"
import SelectDropdown from "react-native-select-dropdown"
import { Card, Layout,Input, Select, SelectItem, IndexPath, Button } from "@ui-kitten/components"
import { Header } from "./registerForm"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserContext } from "../contexts"

export const FormScreen = (props:any) => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [bldg,setBldg] = useState<any>({})
    const [floor, setfloor] = useState<any>({});
    const [room, setroom] = useState('');
    const [department, setdepartment] = useState<any>({});
    const [buildings, setbuildings] = useState<any>(Array(0));
    const [departments, setdepartments] = useState<any>(Array(0))
    const [floors, setfloors] = useState<any>(Array(0));

    const [bldgselectedIndex, setbldgselectedIndex] = useState(new IndexPath(0));
    const [departmentselectedIndex, setdepartmentselectedIndex] = useState(new IndexPath(0));
    const [floorselectedIndex, setfloorselectedIndex] = useState(new IndexPath(0));

    const {user,updateUser} = useContext(UserContext);

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
                setfloors(res)
                setfloorselectedIndex(new IndexPath(0))
            }
        )
    }, [bldg]);

    useEffect(() => {
        getDepartments(floor._id).then(
            res=>
            {setdepartments(res)
            setdepartmentselectedIndex(new IndexPath(0))
            }
            ).catch()
    }, [floor]);


    useEffect(() => {
        if(buildings.length){
            setBldg(buildings[bldgselectedIndex.row])
        }
        //
    }, [bldgselectedIndex]);

    useEffect(() => {
        if(floors?.length){
            setfloor(floors[floorselectedIndex.row])
        }
        //
    }, [floorselectedIndex]);

    useEffect(() => {
        if(departments?.length){
            setdepartment(departments[departmentselectedIndex.row])
        }
        //
    }, [departmentselectedIndex]);

    const validateForm = (body:any) => {
        console.log(body);
        if(!body.name){
            ToastAndroid.show('Please enter a name', ToastAndroid.SHORT)
            return false
        }
        else if(body.contact.length !== 13||!body.contact){
            ToastAndroid.show('Please enter a valid mobile number', ToastAndroid.SHORT)
            return false
        }
        else if(!body.buildingId || !body.departmentId || !body.floorId){
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

    const submitForm = async () => {
        const body = {
            name:name, 
            contact:`+91${mobile}`, 
            buildingId:bldg._id,
            departmentId:department._id,
            floorId: floor._id,
            room: room, 
        }
        if(validateForm(body)){

            AsyncStorage.getItem('jwt')
            .then((jwt)=>{
                if(jwt){
                    fillDetails(body,jwt)
                    .then(res => {
                        updateUser(res.data)
                    })
                    .catch(err=>{})
                }
            })
            .catch(err=>{})
            // const jwt = await AsyncStorage.getItem('jwt') 
            // console.log(jwt);
            // if(jwt){
            //     fillDetails(body,jwt)
            //     .catch(err=>{})
            // }
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
            <Card
                style={styles.card} 
                status='success'
                header={({...props})=><Header {...props} text='Enter your Details' />}
            >
                <Layout style={styles.row}>
                <Input
                        style={styles.input}
                        placeholder='Name'
                        value={name}
                        onChangeText={val=>setName(val)}
                        label='Name'
                        // disabled={verifyLoading}
                    />
                    <Input
                        style={styles.input}
                        placeholder='Mobile Number'
                        value={mobile}
                        onChangeText={val=>setMobile(val)}
                        keyboardType='numeric'
                        maxLength={10}
                        label='Mobile Number'
                        // disabled={verifyLoading}
                    />
                </Layout>
                <Layout style={styles.row} level='1'>
                    <Select
                        label='Select Building'
                        placeholder={'Select Building'}
                        style={styles.input}
                        selectedIndex={Object.keys(bldg).length?bldgselectedIndex:undefined}
                        value={bldg.name}
                        onSelect={(index:any)=>setbldgselectedIndex(index)}
                    >
                        {
                            buildings?.map(
                               (bldg:any,index:number) => <SelectItem title={bldg.name} key={index}/>
                            )
                        }
                    </Select>                    
                    <Select
                        label='Select Floor'
                        placeholder={'Select Floor'}
                        style={styles.input}
                        selectedIndex={Object.keys(floor).length?floorselectedIndex:undefined}
                        value={floor.floor}
                        disabled={Object.keys(bldg).length == 0}
                        onSelect={(index:any)=>setfloorselectedIndex(index)}
                    >
                        {
                            floors?.map(
                               (floor:any,index:number) => <SelectItem title={floor.floor} key={index}/>
                            )
                        }
                    </Select>
                </Layout>
                <Layout style={styles.row} level='1'>
                    <Select
                        label='Select Department'
                        placeholder={'Select Department'}
                        style={styles.input}
                        selectedIndex={Object.keys(department).length?departmentselectedIndex:undefined}
                        value={department.department||''}
                        onSelect={(index:any)=>setdepartmentselectedIndex(index)}
                        disabled={Object.keys(floor).length===0}
                    >
                        {
                            departments?.map(
                               (dep:any,index:number) => <SelectItem title={dep.department} key={index}/>
                            )
                        }
                    </Select>                    
                </Layout>
                <Layout style={styles.row} level='1'>
                <Input
                        style={styles.input}
                        placeholder='Room Number'
                        value={room}
                        onChangeText={val=>setroom(val)}
                        keyboardType='numeric'
                        maxLength={10}
                        label='Room Number'
                        // disabled={verifyLoading}
                    />               
                </Layout>
                <Layout style={{...styles.row,justifyContent:'center',marginTop:12}} level='1'>
                    <Button 
                        onPress={()=>submitForm()}
                        style={styles.text} 
                        status='success'
                        >
                        CONFIRM DETAILS
                    </Button>
                </Layout>
                <Layout style={styles.row}>
                        
                </Layout> 
            </Card>
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
        flex: 1,
        margin: 1,
    }, 
      card:{
        elevation: 30,
        width:'90%'
    },
    row:{
        flexDirection: 'row',
        marginVertical:1
    },
    text:{
        margin:1
    }
})