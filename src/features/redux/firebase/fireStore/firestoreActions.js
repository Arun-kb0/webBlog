import {
    GET_POST_FAILED, GET_POST_START, GET_POST_SUCCESS,
    SAVE_POST_FAILED, SAVE_POST_SUCCESS, SAVE_POST_START,
    ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAILED,
    DELETE_POST_START, DELETE_POST_SUCCESS, DELETE_POST_FAILED,
    REMOVE_SAVED_POST_START, REMOVE_SAVED_POST_SUCCESS, REMOVE_SAVED_POST_FAILED,
} from "../../constants";
import { auth, db } from "../../../../firebase-config";

import {
    collection, getDocs, doc, updateDoc,serverTimestamp, 
    arrayUnion, addDoc, deleteDoc, getDoc, arrayRemove, query,orderBy
} from '../../../../imports/firebaseFunctions'
import { onSnapshot } from "firebase/firestore";

// * get post
const getPostStart = () => {
    console.log("getPostStart called")
    return {
        type: GET_POST_START
    }
}

const getPostSucccess = (data) => {
    console.log("getPostSuccess called")
    return {
        type: GET_POST_SUCCESS,
        payload: data
    }
}

const getPostFailed = (err) => {
    console.log("getPostFailed called")
    return {
        type: GET_POST_FAILED,
        payload: err
    }
}


// * save post
const savePostStart = () => {
    console.log("savePostStart called")
    return {
        type: SAVE_POST_START
    }
}
const savePostSuccess = () => {
    console.log("savePostSuccess called")
    return {
        type: SAVE_POST_SUCCESS
    }
}
const savePostFailed = () => {
    console.log("savePostFailed called")
    return {
        type: SAVE_POST_FAILED
    }
}


// * add post
const addPostStart = () => {
    console.log("addPostStart called")
    return {
        type: ADD_POST_START
    }
}

const addPostSuccess = () => {
    console.log("addPostSuccess called")
    return {
        type: ADD_POST_SUCCESS
    }
}

const addPostFailed = () => {
    return {
        type: ADD_POST_FAILED
    }
}

// * deletePost
const deletePostStart = () => {
    return {
        type: DELETE_POST_START
    }
}

const deletePostSuccess = () => {
    return {
        type: DELETE_POST_SUCCESS
    }
}

const deletePostFailed = () => {
    return {
        type: DELETE_POST_FAILED
    }
}


// * remove saved post
const removeSavedPostStart = () => {
    return {
        type: REMOVE_SAVED_POST_START,
    }
}

const removeSavedPostSuccess = () => {
    return {
        type: REMOVE_SAVED_POST_SUCCESS,
    }
}

const removeSavedPostFailed = (error) => {
    return {
        type: REMOVE_SAVED_POST_FAILED,
        payload: error
    }
}




// *get post async 
export const getPost = () => {

    return async function (dispatch) {
        // console.log("getPost is called")
        dispatch(getPostStart())

        try {
            const postCollectionRef = collection(db, "posts")
            const q = query(postCollectionRef,orderBy('timeStamp','desc'))
            const data = await getDocs(q)

            // * calling users firestore
            let userData = null;
            if (window.localStorage.getItem("isAuth")) {
                const id = auth.currentUser.uid
                const userDataRef = doc(db, "users", id)
                const userSnap = await getDoc(userDataRef)
                userData = userSnap.data()
                // console.log(userData)
            }

            dispatch(getPostSucccess({
                docs: data.docs,
                isEmpty: data.empty,
                size: data.size,
                userData,
            }))

        } catch (error) {
            console.log(error)
            dispatch(getPostFailed(error.message))
        }
    }
}


// * savePost async
export const savePost = (id) => {

    return async function (dispatch) {
        // console.log("setSavedPost");
        // console.log(id);
        dispatch(savePostStart())


        try {
            const data = {
                docName: "users",
                userData: {
                    userId: auth.currentUser.uid,
                    savedPosts: [id]
                }
            }
            const userActionRef = doc(db, data.docName, data.userData.userId)
            const unionRes = await updateDoc(userActionRef, {
                savedPosts: arrayUnion(`${data.userData.savedPosts}`)
            })
            console.log(unionRes)
            dispatch(savePostSuccess())

        } catch (error) {
            console.warn(error)
            dispatch(savePostFailed())

        }
    }
}


// remove saved
export const removeSaved = (id) => {
    return async function (dispatch) {
        // console.log("removeSavedPost called")
        dispatch(removeSavedPostStart())
        try {
            const userActionRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userActionRef, {
                savedPosts: arrayRemove(id)
            })
            dispatch(removeSavedPostSuccess())
        } catch (error) {
            console.log(error)
            dispatch(removeSavedPostFailed(error))
        }
    }
}


// *add post async 
export const addPost = (data) => {

    return async function (dispatch) {
        console.log("addPost")
        console.log(data)
        dispatch(addPostStart())

        try {
            const commentRef = collection(db, 'comments')
            const newDoc = await addDoc(commentRef, {})
            const commentSnap = await getDoc(newDoc)
            data.doc.commentRef = commentSnap.id
            // console.warn(commentSnap.id)

            const likeRef = collection(db, 'likes')
            const likeDoc = await addDoc(likeRef, {})
            const likeSnap = await getDoc(likeDoc)
            data.doc.likesRef = likeSnap.id

            // const shareRef = collection(db,'share')
            // const shareDoc = await addDoc(shareRef,{})
            // const shareSnap = await getDoc(shareDoc)
            // data.doc.shareRef = shareSnap.id
            
            data.doc.timeStamp  = serverTimestamp()
            const collectionRef = collection(db, data.docName) 
            const postData = await addDoc(collectionRef, data.doc)

            console.warn(postData.id)
            const docRef = doc(db,'posts' , postData.id)
            const res = await updateDoc(docRef , {
                id:`${postData.id}`
            })

            

            console.log(res)
            dispatch(addPostSuccess())
        } catch (error) {
            console.log(error)
            dispatch(addPostFailed())
        }
    }
}


// * deletePost async
export const deletePost = (data) => {
    return async function (dispatch) {
        // console.log("deletePost called")
        console.log(data.id)

        try {
            dispatch(deletePostStart())
            const commentRef = doc(db, "comments", data.commentRef)
            await deleteDoc(commentRef)
            const likesRef = doc(db, 'likes', data.likesRef)
            await deleteDoc(likesRef)
            const postRef = doc(db, "posts", data.id)
            await deleteDoc(postRef)


            dispatch(deletePostSuccess())

        } catch (error) {
            console.log(error)
            dispatch(deletePostFailed())
        }
    }
}






