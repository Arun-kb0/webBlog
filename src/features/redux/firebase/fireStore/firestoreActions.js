import {
    GET_POST_FAILED, GET_POST_START, GET_POST_SUCCESS,
    SAVE_POST_FAILED, SAVE_POST_SUCCESS, SAVE_POST_START,
    LIKE_POST_START, LIKE_POST_SUCCESS, LIKE_POST_FAILED,
    ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAILED,
    DELETE_POST_START, DELETE_POST_SUCCESS, DELETE_POST_FAILED,
    REMOVE_LIKED_POST_FAILED, REMOVE_LIKED_POST_START, REMOVE_LIKED_POST_SUCCESS,
    REMOVE_SAVED_POST_START, REMOVE_SAVED_POST_SUCCESS, REMOVE_SAVED_POST_FAILED,
    COMMENT_POST_START, COMMENT_POST_SUCCESS, COMMENT_POST_FAILED
} from "../../constants";
import { auth, db } from "../../../../firebase-config";
import {
    collection, getDocs, doc, updateDoc,
    arrayUnion, addDoc, deleteDoc, getDoc, arrayRemove
} from "firebase/firestore";
import { confirmPasswordReset } from "firebase/auth";
import { Action } from "@remix-run/router";
import { async } from "@firebase/util";


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


// * like post
const likePostStart = () => {
    console.log("likePostStart called ")
    return {
        type: LIKE_POST_START
    }
}
const likePostSuccess = () => {
    console.log("likePostSuccess called ")
    return {
        type: LIKE_POST_SUCCESS
    }
}
const likePostFailed = () => {
    console.log("likePostFailed called ")
    return {
        type: LIKE_POST_FAILED
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
    console.log("addPostFailed called")
    return {
        type: ADD_POST_FAILED
    }
}

// * deletePost
const deletePostStart = () => {
    console.log(" called")
    return {
        type: DELETE_POST_START
    }
}

const deletePostSuccess = () => {
    console.log("deletePostSuccess called")
    return {
        type: DELETE_POST_SUCCESS
    }
}

const deletePostFailed = () => {
    console.log("deletePostFailed called")
    return {
        type: DELETE_POST_FAILED
    }
}

//  * remove likded post
const removeLikdePostStart = () => {
    console.log("removeLikdePostStart called")
    return {
        type: REMOVE_LIKED_POST_START
    }
}
const removeLikdePostSuccess = () => {
    console.log("removeLikdePostSuccess called")
    return {
        type: REMOVE_LIKED_POST_SUCCESS
    }
}
const removeLikdePostFailed = (error) => {
    console.log("removeLikdePostFailed called")
    return {
        type: REMOVE_LIKED_POST_FAILED,
        payload: error
    }
}

// * remove saved post
export const removeSavedPostStart = () => {
    return {
        type: REMOVE_SAVED_POST_START,
    }
}

export const removeSavedPostSuccess = () => {
    return {
        type: REMOVE_SAVED_POST_SUCCESS,
    }
}

export const removeSavedPostFailed = (error) => {
    return {
        type: REMOVE_SAVED_POST_FAILED,
        payload: error
    }
}

export const commentPostStart = () => {
    return {
        type: COMMENT_POST_START,
    }
}


export const commentPostSuccess = () => {
    return {
        type: COMMENT_POST_SUCCESS,
    }
}


export const commentPostFailed = (error) => {
    return {
        type: COMMENT_POST_FAILED,
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
            const data = await getDocs(postCollectionRef)
           
            const liked =data.docs.map(doc=>{
                // console.log(doc.data().liked )
                return(doc.data().liked)
            } )
            console.warn(liked)

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
                liked
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
                    likedPosts: [],
                    savedPosts: [id]
                }
            }
            const userActionRef = doc(db, data.docName, data.userData.userId)
            const unionRes = updateDoc(userActionRef, {
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


// * like post async
export const likePost = (id) => {

    return async function (dispatch) {
        // console.log("likePost called")
        dispatch(likePostStart())

        try {
            const postRef = doc(db, 'posts', id)
            const unionRes = await updateDoc(postRef, {
                liked: arrayUnion(`${auth.currentUser.uid}`)
            })

            console.log(unionRes)
            dispatch(likePostSuccess())

        } catch (error) {
            console.log(error)
            dispatch(likePostFailed())
        }



    }
}


// *add post async 
export const addPost = (data) => {

    return async function (dispatch) {
        // console.log("addPost")
        console.log(data)
        dispatch(addPostStart())

        try {
            const collectionRef = collection(db, data.docName)
            const res = await addDoc(collectionRef, data.doc)
            console.log(res)
            dispatch(addPostSuccess())
        } catch (error) {
            console.log(error)
            dispatch(addPostFailed())
        }
    }
}


// * deletePost async
export const deletePost = (id) => {
    return async function (dispatch) {
        // console.log("deletePost called")
        console.log(id)

        try {
            dispatch(deletePostStart())
            const data = {
                docName: "posts",
                docId: id,
            }
            const collectionRef = doc(db, data.docName, data.docId)
            await deleteDoc(collectionRef)
            dispatch(deletePostSuccess())

        } catch (error) {
            console.log(error)
            dispatch(deletePostFailed())
        }
    }
}

// remove liked
export const removeLiked = (id) => {
    return async function (dispatch) {
        // console.log("remove liked called")
        console.log(id)
        dispatch(removeLikdePostStart())
        try {
            const postRef= doc(db,'posts',id)
            await updateDoc(postRef,{
                liked: arrayRemove(`${auth.currentUser.uid}`)
            })

            dispatch(removeLikdePostSuccess())
        } catch (error) {
            console.log(error)
            dispatch(removeLikdePostFailed(error))
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

// comment post
export const commentPost = (data) => {
    return async function (dispatch) {
        // console.log("comment post called ")
        dispatch(commentPostStart())

        try {
            console.log(data)
            const commentsRef = doc(db, 'posts', data.postId)
            const unionRes = await updateDoc(commentsRef, {
                comments: arrayUnion(data.comment)
            })
            console.log(unionRes)
            dispatch(commentPostSuccess())
        } catch (error) {
            console.log(error);
            dispatch(commentPostFailed(error))
        }
    }
}
