import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, arrayUnion, updateDoc, query, where, getDocs, collectionGroup, } from "firebase/firestore";


const initialState = {
    isLoading: true,
    isfinished: false
}

const crudSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        addData: async (state, action) => {
            console.log("addData")
            const data = action.payload
            console.log(data)
            const collectionRef = collection(db, data.docName)
            const res = await addDoc(collectionRef, data.doc)
            if (res) {
                state.isLoading = false
                state.isfinished = true
            }
        },
        deleteData: async (state, action) => {
            console.log("deleteData")
            const data = action.payload
            console.log(data)
            const collectionRef = doc(db, data.docName, data.docId)
            await deleteDoc(collectionRef)
            console.log("deleted")
            state.isLoading = false
        },
        setSavedPosts: async (state, action) => {
            state.isLoading = true
            console.log("setSavedPosts")

            const data = action.payload
            console.log(data)
            const userActionRef = doc(db, data.docName, data.userData.userId)
            const unionRes = updateDoc(userActionRef, {
                savedPosts: arrayUnion(`${data.userData.savedPosts}`)
            })

            if (unionRes) {
                state.isLoading = false
                state.isfinished = true
                console.log(unionRes)
                console.log("savedPosts updated --firestore")

            }
        },
        setLikedPosts: async (state, action) => {
            state.isLoading = false
            console.log("setLikedPosts")

            const data = action.payload
            console.log(data)
            const userActionRef = doc(db, data.docName, data.userData.userId)

            const unionRes = await updateDoc(userActionRef, {
                likedPosts: arrayUnion(`${data.userData.likedPosts}`)
            })

            if (unionRes) {
                state.isLoading = false
                state.isfinished = true
                console.log(unionRes)
                console.log("likedPosts updated --firestore")
            }
        },

    }
})

export const { addData, deleteData, setSavedPosts, setLikedPosts } = crudSlice.actions
export default crudSlice.reducer
