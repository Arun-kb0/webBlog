import {
    SHARE_START, SHARE_FAILED, SHARE_SUCCESS,
    REMOVE_SHARE_FAILED, REMOVE_SHARE_SUCCESS, REMOVE_SHARE_START,
    GET_SHARE_FAILED, GET_SHARE_START, GET_SHARE_SUCCESS,
    GET_SAVED_START, GET_SAVED_SUCCESS, GET_SAVED_FAILED,
} from "../../constants";

import { db } from "../../../../firebase-config";
import {
    doc, arrayUnion, getDoc, updateDoc, arrayRemove,
    getDocs, collection, query, where
} from "../../../../imports/firebaseFunctions";
import shareReducer from "./shareReducer";
import { data } from "autoprefixer";
import { addDoc, serverTimestamp, writeBatch } from "firebase/firestore";

// import { collection, query, where } from "firebase/firestore";

// import { doc, arrayUnion, getDoc, updateDoc, arrayRemove } from "firebase/firestore";


// * share

const shareStart = () => {
    return {
        type: SHARE_START

    }
}

const shareSuccess = () => {
    return {
        type: SHARE_SUCCESS,
    }
}

const shareFailed = (error) => {
    return {
        type: SHARE_FAILED,
        payload: error
    }
}


// *get shared
const getSharedStart = () => {
    return {
        type: GET_SHARE_START
    }
}
const getSharedSuccess = (shared) => {
    return {
        type: GET_SHARE_SUCCESS,
        payload: shared
    }
}
const getSharedFailed = (error) => {
    return {
        type: GET_SHARE_FAILED,
        payload: error
    }
}


// * get saved 
const getSavedPostsStart = () => {
    return {
        type: GET_SAVED_START

    }
}


const getSavedPostsSuccess = (saved) => {
    return {
        type: GET_SAVED_SUCCESS,
        payload: saved

    }
}


const getSavedPostsFailed = () => {
    return {
        type: GET_SAVED_FAILED

    }
}

export const sharePost = ({ post, userDoc }) => {
    return async function (dispatch) {
        dispatch(shareStart())
        // console.log(post)
        try {

            const commentRef = collection(db, 'comments')
            const likeRef = collection(db, 'likes')
            const commentDoc = await addDoc(commentRef, {})
            const likeDoc = await addDoc(likeRef, {})
            console.log(commentDoc.id, likeDoc.id)

            const postRef = collection(db, 'posts')
            let postData
            if (!post.shared) {
                postData = await addDoc(postRef, {
                    ...post,
                    timeStamp: serverTimestamp(),
                    commentRef: commentDoc.id,
                    likesRef: likeDoc.id,
                    likeCount: 0,
                    shared: {
                        originId: post.postId,
                        sharedBy: userDoc.userId,
                        shareUser: userDoc.name
                    }
                })
            } else {
                postData = await addDoc(postRef, {
                    ...post,
                    timeStamp: serverTimestamp(),
                    commentRef: commentDoc.id,
                    likesRef: likeDoc.id,
                    likeCount: 0,
                    shared: {
                        originId: post.shared.originId,
                        sharedBy: userDoc.userId,
                        shareUser: userDoc.name
                    }
                })
            }
            console.log(postData)
            const docRef = doc(db, 'posts', postData.id)
            await updateDoc(docRef, {
                id: `${postData.id}`
            })



            console.warn("share successfull! ")

            dispatch(shareSuccess())

        } catch (error) {
            console.error(error)
            dispatch(shareFailed(error))
        }
    }
}

// *get shared
export const getShared = (uid) => {
    return async function (dispatch) {
        dispatch(getSharedStart())
        console.log(uid)

        try {
            const postRef = collection(db, 'posts')
            const q = query(postRef,
                where('shared.sharedBy', '==', uid)
            )
            const snap = await getDocs(q)
            console.log(q)
            const posts = snap.docs?.map(post=>{
                return post.data()
            }) 
            console.log(posts)

            dispatch(getSharedSuccess(posts))
        } catch (error) {
            console.error(error)
            dispatch(getSharedFailed(error))
        }
    }
}


export const getSavedPosts = (userSaved) => {
    return async function (dispatch) {
        dispatch(getSavedPostsStart())
        try {
            const postColRef = collection(db, 'posts')
            const q = query(postColRef,
                where('id', 'in', userSaved)

            )
            const snap = await getDocs(q);
            const saved = snap?.docs.map((doc) => {
                return doc.data()
            })
            console.log(saved)
            dispatch(getSavedPostsSuccess(saved))
        } catch (error) {
            console.log(error)

            dispatch(getSavedPostsFailed())
        }
    }
}
