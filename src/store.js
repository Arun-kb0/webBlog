import React from "react";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import loginReducer from "./features/login/loginSlice";
import crudReducer from './features/firebase/crudSlice'


export const store = configureStore({
    reducer:{
        login:loginReducer,
        crud:crudReducer,
    },
    middleware:[
        ...getDefaultMiddleware({
            serializableCheck:false
        }),
    ]

});

