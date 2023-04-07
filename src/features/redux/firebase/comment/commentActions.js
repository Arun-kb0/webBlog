import {
    COMMENT_POST_START, COMMENT_POST_SUCCESS, COMMENT_POST_FAILED,
    GET_COMMENT_FAILED, GET_COMMENT_START, GET_COMMENT_SUCCESS, DELETE_COMMENT_START, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED
} from "../../constants";

import { db } from "../../../../firebase-config";
import {
    collection, doc, updateDoc, arrayUnion, onSnapshot, arrayRemove,
} from "firebase/firestore";


export const commentPostStart = () => {
    return {
        type: COMMENT_POST_START,
    }
}


export const commentPostSuccess = (comments) => {
    return {
        type: COMMENT_POST_SUCCESS,
        payload: comments
    }
}


export const commentPostFailed = (error) => {
    return {
        type: COMMENT_POST_FAILED,
        payload: error
    }
}


const getCommentStart = () => {
    return {
        type: GET_COMMENT_START
    }
}


const getCommentSuccess = (comments) => {
    return {
        type: GET_COMMENT_SUCCESS,
        payload: comments
    }
}


const getCommentFailed = () => {
    return {
        type: GET_COMMENT_FAILED
    }
}


const deleteCommetStart = () => {
    return {
        type: DELETE_COMMENT_START
    }
}
const deleteCommetSuccess = () => {
    return {
        type: DELETE_COMMENT_SUCCESS
    }
}

const deleteCommetFailed = (error) => {
    return {
        type: DELETE_COMMENT_FAILED,
        payload: error
    }
}

// add comments
export const commentPost = (data) => {
    return async function (dispatch) {
        console.log("comment post called ")
        dispatch(commentPostStart())

        try {
            // console.log(data)
            const commentRef = collection(db, 'comments')
            const customId = data.commentRefId
            const customRef = doc(commentRef, customId)
            const unsubscribe = onSnapshot(customRef, (doc) => {
                const comments = doc.data().postComments || []
                dispatch(commentPostSuccess(comments))
                console.log(comments)
            })

            const updateData = {
                postComments: arrayUnion(data.commentData)
            }
            const res = await updateDoc(customRef, updateData, { merge: true })
            console.log(res)

            unsubscribe()
        } catch (error) {
            console.log(error);
            dispatch(commentPostFailed(error))
        }
    }
}


// get Comments 
export const getComments = (commentId) => {

    return async function (dispatch) {
        dispatch(getCommentStart())

        try {
            const commentRef = doc(db, 'comments', commentId)
            const unsubscribe = onSnapshot(commentRef, (doc) => {
                const comments = doc.data()?.postComments || []
                dispatch(getCommentSuccess(comments))
                console.log(comments)
            })
            console.warn(res.data())
            unsubscribe()

        } catch (error) {
            dispatch(getCommentFailed(error))
        }
    }
}

//  delete comment
export const deleteComment = ({ comment, id }) => {
    console.log("deleteComment")

    return async function (dispatch) {
        dispatch(deleteCommetStart())
        // console.warn(timeStamp)
        console.warn(id)

        try {
            const commentRef = doc(db, 'comments', id)
            await updateDoc(commentRef, {
                postComments: arrayRemove(comment)
            })
            dispatch(deleteCommetSuccess())
        } catch (error) {
            console.log(error)
            dispatch(deleteCommetFailed(error))
        }
    }
}
