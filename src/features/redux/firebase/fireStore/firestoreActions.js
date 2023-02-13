import {
    GET_POST_FAILED, GET_POST_START, GET_POST_SUCCESS,
    SAVE_POST_FAILED, SAVE_POST_SUCCESS, SAVE_POST_START,
    LIKE_POST_START, LIKE_POST_SUCCESS, LIKE_POST_FAILED,
    ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAILED,
    DELETE_POST_START, DELETE_POST_SUCCESS, DELETE_POST_FAILED
} from "../../constants";
import { auth, db } from "../../../../firebase-config";
import { async } from "@firebase/util";
import { collection, getDocs, doc, updateDoc, arrayUnion, addDoc, deleteDoc } from "firebase/firestore";
import { MdNoSim } from "react-icons/md";

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

const getPostFailed = () => {
    console.log("getPostFailed called")
    return {
        type: GET_POST_FAILED
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


// *get post async 
export const getPost = () => {

    return async function (dispatch) {
        console.log("getPost is called")
        dispatch(getPostStart())

        try {
            const postCollectionRef = collection(db, "posts")
            const data = await getDocs(postCollectionRef)
            console.log(data)
            dispatch(getPostSucccess({ docs: data.docs, isEmpty: data.empty, size: data.size }))
        } catch (error) {
            console.log(error)
            dispatch(getPostFailed())
        }
    }
}


// * savePost async
export const savePost = (id) => {

    return async function (dispatch) {
        console.log("setSavedPost");
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
        console.log("likePost called")
        dispatch(likePostStart())

        try {
            const data = {
                docName: "users",
                userData: {
                    userId: auth.currentUser.uid,
                    likedPosts: [id],
                    savedPosts: []
                }
            }

            const userActionRef = doc(db, data.docName, data.userData.userId)
            const unionRes = await updateDoc(userActionRef, {
                likedPosts: arrayUnion(`${data.userData.likedPosts}`)
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
        console.log("addPost")
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
        console.log("deletePost called")
        console.log(id)

        try {
            dispatch(deletePostStart())
            const data = {
                docName: "posts",
                docId: id,
            }
            const collectionRef = doc(db, data.docName, data.docId)
            await deleteDoc(collectionRef)
            dispatch(deletePostSuccess)
        } catch (error) {
            console.log(error)
            dispatch(deletePostFailed())
        }
    }
}