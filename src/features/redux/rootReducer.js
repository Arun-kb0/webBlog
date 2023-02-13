import {combineReducers} from 'redux'
import authReducer from  './firebase/auth/authReducer'
import firestoreReducer  from './firebase/firestore/firestoreReducer'


export default combineReducers({
    user:authReducer,
    firestoreDB:firestoreReducer
})

