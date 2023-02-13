// import { createAction, createSlice } from "@reduxjs/toolkit"
// import { db, auth } from "../../firebase-config"
// import { setDoc, doc, collection, addDoc } from "firebase/firestore"
// import { signInWithEmailAndPassword } from 'firebase/auth'


// const initialState = {
//     isLoading: true,
//     isfinsished: false
// }

// const authSlice = createSlice({
//     name: 'auth0',
//     initialState,
//     reducers: {
//         createUSer: async (state, action) => {
//             console.log("createUser")
//             const data = action.payload
//             console.log(data)

//             const userCollectionRef = doc(db, "users", auth.currentUser.uid)
//             await setDoc(userCollectionRef, {
//                 name: data.username,
//                 userId: auth.currentUser.uid,
//                 likedPosts: [],
//                 savedPosts: []
//             })

//         }
//     }
// })

// export const { createUSer } = authSlice.actions
// export default authSlice.reducer