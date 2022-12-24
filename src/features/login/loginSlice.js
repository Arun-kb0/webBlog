import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: localStorage.getItem("isAuth"),
    username:undefined,
    useDetails: [],
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            console.log("from setLoginUser")
            console.log(action.payload)
            state.isAuth = action.payload.isAuth
            state.username = action.payload.username
            // console.log(state.isAuth)
            // console.log(state.username)
        },
        clearLoginUser:(state)=>{
            state.isAuth=false
            console.log("from clearLoginUser")
            console.log(state.isAuth)
        }
    }
})

console.log(loginSlice)
export const { setLoginUser,clearLoginUser } = loginSlice.actions;
export default loginSlice.reducer;


