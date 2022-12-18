import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
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
        }
    }
})

console.log(loginSlice)
export const { setLoginUser } = loginSlice.actions;
export default loginSlice.reducer;


