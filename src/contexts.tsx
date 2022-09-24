import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({}) 

export const UserContextProvider = ({children}:any) => {

    const [user, setuser] = useState<any>({});

    const updateUser = (user:any) => setuser(user) ;

    useEffect(() => {
        AsyncStorage.setItem('user',JSON.stringify(user))
        .then(
            res => {}
        )
        .catch(err=>{})
        if(user.detailsEntered){
        
        }
    }, [user]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(
            value => {
                if(value){
                    setuser(JSON.parse(value))
                    AsyncStorage.getItem('jwt').then(
                        value=>{
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