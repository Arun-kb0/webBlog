import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: localStorage.getItem("isAuth"),
    useDetails: [],
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            console.log("from setLoginUser")
            state.isAuth = action.payload
            console.log(state.isAuth)
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


