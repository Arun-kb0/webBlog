import React from "react";
import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import loginReducer from "./features/login/loginSlice";
import crudReducer from './features/firebase/crudSlice'
import authReducer from "./features/firebase/authSlice";

// ! redux tool kit not working
// ! add combine reducers

export const store = configureStore({
    reducer:{
        login:loginReducer,
        // * firebase reducers 
        crud:crudReducer,
        auth0:authReducer
        
    },
    middleware:[
        ...getDefaultMiddleware({
            serializableCheck:false
        }),
        thunk
    ],

    
    
    

});

