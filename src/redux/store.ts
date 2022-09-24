import {createStore , applyMiddleware} from 'redux' ; 
import {persistReducer , persistStore} from 'redux-persist' ; 
import thunk from 'redux-thunk' ; 
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { reducer } from './reducers';

const persistConfig = {
    key : 'root' , 
    storage : AsyncStorage , 
} 

const persistedReducer = persistReducer(persistConfig , reducer) 

const store = createStore(persistedReducer , applyMiddleware(thunk)) 
const persistor = persistStore(store) ; 

export {store , persistor} ;