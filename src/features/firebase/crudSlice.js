import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, arrayUnion, updateDoc, query, where, getDoc } from "firebase/firestore";


const initialState = {
    isLoading: true,
    isfinished: false,

}

const crudSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {

        // * creating post
        addData: async (state, action) => {
            let isLoading = state.isLoading;
            let isfinished = state.isfinished
            try {
                console.log("addData")
                const data = action.payload
                console.log(data)
                const collectionRef = collection(db, data.docName)
                const res = await addDoc(collectionRef, data.doc)
                isLoading = false
                isfinished = true
                console.log("post created --firestore")

            } catch (err) {
                console.log(err)
            }
        },

        // * deleting post
        deleteData: async (state, action) => {
            let isLoading = state.isLoading;
            let isfinished = state.isfinished
            try {

                console.log("deleteData")
                const data = action.payload
                console.log(data)
                const collectionRef = doc(db, data.docName, data.docId)
                await deleteDoc(collectionRef)
                isLoading = false
                isfinished = true
                console.log("deleted --firestore")

            } catch (err) {
                console.log(err)
            }
        },

        // * updating saved posts
        setSavedPosts: async (state, action) => {
            let isLoading = state.isLoading;
            let isfinished = state.isfinished
            try {

                isLoading = true
                console.log("setSavedPosts")

                const data = action.payload
                // console.log(data)
                const userActionRef = doc(db, data.docName, data.userData.userId)
                const unionRes = updateDoc(userActionRef, {
                    savedPosts: arrayUnion(`${data.userData.savedPosts}`)
                })

                if (unionRes) {
                    isLoading = false
                    isfinished = true
                    // console.log(unionRes)
                    console.log("savedPosts updated --firestore")

                }
            } catch (err) {
                console.log(err)
            }
        },

        // * updating liked posts
        setLikedPosts: async (state, action) => {
            let isLoading = state.isLoading;
            let isfinished = state.isfinished
            try {
                isLoading = false
                console.log("setLikedPosts")

                const data = action.payload
                // console.log(data)
                const userActionRef = doc(db, data.docName, data.userData.userId)
                const unionRes = await updateDoc(userActionRef, {
                    likedPosts: arrayUnion(`${data.userData.likedPosts}`)
                })

                if (unionRes) {
                    isLoading = false
                    isfinished = true
                    // console.log(unionRes)
                    console.log("likedPosts updated --firestore")
                }
            } catch (err) {
                console.log(err)
            }
        },

        // * getting user liked and saved posts
        getUserIntractions: async (state, action) => {

            try {
                const id = action.payload
                console.log("getUserIntractions")
                // console.log(id)
                const userRef = doc(db, "users", id)
                const userData = await getDoc(userRef)
                // console.log(userData.data())

                state.likedPosts = userData.data().likedPosts.slice()
                state.savedPosts = userData.data().savedPosts.slice()

                console.log(state.likedPosts)
                console.log("userData fetched --firestore")

                // return { likedPosts, savedPosts }
            } catch (err) {
                console.log(err)
            }

        }

    }
})

export const { addData, deleteData, setSavedPosts, setLikedPosts, getUserIntractions } = crudSlice.actions
export default crudSlice.reducer
