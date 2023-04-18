import {
    SHARE_START, SHARE_FAILED, SHARE_SUCCESS,
    REMOVE_SHARE_FAILED, REMOVE_SHARE_SUCCESS, REMOVE_SHARE_START,
    GET_SHARE_FAILED, GET_SHARE_START, GET_SHARE_SUCCESS,
} from "../../constants";

import { db } from "../../../../firebase-config";
import { doc, arrayUnion, getDoc, updateDoc, arrayRemove } from "../../../../imports/firebaseFunctions";

// import { doc, arrayUnion, getDoc, updateDoc, arrayRemove } from "firebase/firestore";


// * share

const shareStart = () => {
    return {
        type: SHARE_START

    }
}

const shareSuccess = (data) => {
    return {
        type: SHARE_SUCCESS,
        payload: data
    }
}

const shareFailed = (error) => {
    return {
        type: SHARE_FAILED,
        payload: error
    }
}


// * remove shared
const removeSharedStart = () => {
    return {
        type: REMOVE_SHARE_START
    }
}

const removeSharedSuccess = (data) => {
    return {
        type: REMOVE_SHARE_SUCCESS,
        payload: data
    }
}

const removeSharedFailed = (error) => {
    return {
        type: REMOVE_SHARE_FAILED,
        payload: error
    }
}


// ! not completed 
// ! complete after mesgaeing setup 

export const sharePost = ({data,userDoc}) => {
    return async function (dispatch) {
        dispatch(shareStart())

        try {
            // const userRef = doc(db, 'users', data.uid)
            // const userSnap = await getDoc(userRef)
            // console.warn(userSnap.data().shareRef)
            // const shareDocId = userSnap.data().shareRef
            
            const shareRef = doc(db, 'share', userDoc.shareRef)
            await updateDoc(shareRef, {
                uid: data.uid,
                shared: arrayUnion(data.postId)
                
            })

            dispatch(shareSuccess(userDoc.shareRef))

        } catch (error) {
            console.log(error)
            dispatch(shareFailed(error))
        }
    }
}


export const removeShared = (data) => {
    return async function (dispatch) {
        dispatch(removeSharedStart())
        try {
            console.warn(data)
            const userRef = doc(db, 'users', data.uid)
            const userSnap = await getDoc(userRef)
            console.warn(userSnap.data().shareRef)
            const shareDocId = userSnap.data().shareRef
            const shareRef = doc(db, 'share', shareDocId)
            await updateDoc(shareRef, {
                shared: arrayRemove(data.postId)
            })

            dispatch(removeSharedSuccess())
        } catch (error) {
            console.log(error)
            dispatch(removeSharedFailed())
        }
    }
}