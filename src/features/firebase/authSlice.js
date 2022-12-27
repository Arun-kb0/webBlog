import { createAction, createSlice } from "@reduxjs/toolkit"
import { db,auth } from "../../firebase-config"
import { setDoc,doc } from "firebase/firestore"

const initialState = {
    isLoading: true,
    isfinsished: false
}

const authSlice = createSlice({
    name: 'auth0',
    initialState,
    reducers: {
        createUSer: (state, action) => {
            console.log("createUser")
            const data = action.payload
            console.log(data)

            const userActionRef = doc(db,"userActions",data.uid)
            setDoc(userActionRef,{
                userId:auth.currentUser.uid,
                likedPosts:[],
                savedPosts:[]
              })
            
        }
    }
})

export const { createUSer } = authSlice.actions
export default authSlice.reducer