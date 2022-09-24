import { combineReducers } from "redux";
import { LOGIN_USER, LOGOUT_USER, REMOVE_JWT, REMOVE_USER, SET_JWT, SET_USER } from "../actions/actionTypes";

export const loginReducer = (state=false,action:any) => {
    switch(action.type){
        case LOGIN_USER: 
            {return true; }
        
        case LOGOUT_USER:
            {return false;} 

        default:{
            return state
        }
    }
} 

export const jwtReducer = (state='',action:any) => {
    switch(action.type){
        case SET_JWT:{
            return action.payload
        }
        case REMOVE_JWT:{
            return ''
        } 
        default:{
            return state 
        }
    }
} 

export const userReducer = (state={},action:any) => {
    switch(action.type){
        case SET_USER:{
            return {...action.payload}
        }
        case REMOVE_USER:{
            return {}
        } 
        default:{
            return state 
        }
    }
} 


export const reducer = combineReducers({
    user: userReducer,
    isLoggedIn: loginReducer, 
    jwt: jwtReducer
})