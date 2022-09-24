import { LOGIN_USER, LOGOUT_USER, REMOVE_JWT, REMOVE_USER, SET_JWT, SET_USER } from "./actionTypes"

export const loginUser = () => {
    return {
        type: LOGIN_USER, 
        payload: true 
    }
} 

export const logoutUser = () => {
    return {
        type: LOGOUT_USER, 
        payload:false 
    }
} 

export const addJWT = (payload:string) => {
    return {
        type: SET_JWT, 
        payload: payload
    }
} 

export const removeJWT = () => {
    return{
        type: REMOVE_JWT 
    }
} 

export const setUser = (payload: any) => {
    return {
        type: SET_USER, 
        payload:payload
    }
} 

export const removeUser = () => {
    return {
        type: REMOVE_USER, 
    }
}