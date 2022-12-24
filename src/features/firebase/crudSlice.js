import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";


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
        
    }
})

export const { addData, deleteData } = crudSlice.actions
export default crudSlice.reducer
