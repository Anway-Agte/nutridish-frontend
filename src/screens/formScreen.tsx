import { View, StyleSheet, ToastAndroid} from "react-native"
import React, {  useEffect, useState } from "react"
import { fillDetails, getBuildings, getDepartments, getFloors } from "../api"
import { Card, Layout,Input, Select, SelectItem, IndexPath, Button, CheckBox, Radio, RadioGroup } from "@ui-kitten/components"
import { Header } from "./registerForm"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/actions/actionCreator"

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
    const jwt = useSelector((state:any) => state.jwt);
    const user = useSelector((state:any) => state.user);
    const dispatch = useDispatch();

    const [staffIndex,setStaffIndex] = useState(1);

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
    }, [departmentselectedIndex]);

    const validateForm = (body:any) => {
        if(!body.name){
            ToastAndroid.show('Please enter a name', ToastAndroid.SHORT)
            return false
        }
        else if(body.contact.length !== 13||!body.contact){
            ToastAndroid.show('Please enter a valid mobile number', ToastAndroid.SHORT)
            return false
        }
        else if(staffIndex===0 && (!body.buildingId || !body.departmentId || !body.floorId)){
            ToastAndroid.show('Please select all the field values', ToastAndroid.SHORT)
            return false
        }
        else if(staffIndex===0 && (!body.room)){
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
            buildingId:!staffIndex ?bldg._id : '',
            departmentId:!staffIndex ?department._id : '',
            floorId: !staffIndex ? floor._id : '',
            room: !staffIndex ? room : '', 
            isStaff: staffIndex==0?true:false
        }
        if(validateForm(body)){
            fillDetails(body,jwt)
            .then(
                user=>{
                    dispatch(setUser(user.data))
                }
            )
            .catch(err=>{
                
            })
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
                <Layout style={styles.row}>
                    <RadioGroup
                        style={{...styles.row, marginTop:8}}
                        selectedIndex={staffIndex}
                        onChange={index => setStaffIndex(index)}>
                        <Radio>Staff</Radio>
                        <Radio>Student</Radio>
                    </RadioGroup>
                </Layout>
                {
                    staffIndex == 0 ? 
                    <>
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
                    </>
                : <></>
                }
                {/* <Layout style={{...styles.row, marginTop:12}}>
                <CheckBox
                    status="info"
                    checked={isStaff}
                    onChange={nextChecked => setisStaff(nextChecked)}>
                    Staff
                </CheckBox>
                </Layout>  */}
                <Layout style={{...styles.row,justifyContent:'center',marginTop:12}} level='1'>
                    <Button 
                        onPress={()=>submitForm()}
                        style={styles.text} 
                        status='success'
                        >
                        CONFIRM DETAILS
                    </Button>
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