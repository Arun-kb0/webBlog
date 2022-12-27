import React from "react";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import loginReducer from "./features/login/loginSlice";
import crudReducer from './features/firebase/crudSlice'
import authReducer from "./features/firebase/authSlice";

// ! redux tool kit not working
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


export const store = configureStore({
    reducer:{
        login:loginReducer,
        // * firebase reducers 
        crud:crudReducer,
        auth0:authReducer
        
    },
    composeEnhancers, 
    middleware:[
        ...getDefaultMiddleware({
            serializableCheck:false
        }),
    ],
    

});

