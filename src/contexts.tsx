import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({}) 

export const UserContextProvider = ({children}:any) => {

    const [user, setuser] = useState<any>({});

    const updateUser = (user:any) => setuser(user) ;

    useEffect(() => {
        console.log('use-effect',user)
        if(user.detailsEntered){
        AsyncStorage.setItem('user',JSON.stringify(user))
        }
    }, [user]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(
            value => {
                if(value){
                    console.log('first ',value);
                    setuser(JSON.parse(value))
                    AsyncStorage.getItem('jwt').then(
                        value=>{
                            console.log(value);
                        }
                    )
                }
            }
        ).catch()
    }, []);

    return(
        <UserContext.Provider value={{user,updateUser}}>
            {children}
        </UserContext.Provider>
    )
}