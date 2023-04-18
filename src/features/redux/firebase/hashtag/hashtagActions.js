import { GET_TAG_START, GET_TAG_SUCCESS, GET_TAG_FAILED } from "../../constants";

import { db } from "../../../../firebase-config";
import { query, collection, where, getDocs } from '../../../../imports/firebaseFunctions'


const getTagStart = () => {
    return {
        type: GET_TAG_START
    }
}


const getTagSuccess = (data) => {
    return {
        type: GET_TAG_SUCCESS,
        payload: data
    }
}


const getTagFailed = (error) => {
    return {
        type: GET_TAG_FAILED,
        payload: error
    }
}



export const getHashtagPosts = (tag) => {
    return async function (dispatch) {
        dispatch(getTagStart())
        console.log(tag)
        try {
            const postRef = collection(db, 'posts')
            const q = query(postRef,
                where('hashtags', 'array-contains', tag)
            )
            const querySnap = await getDocs(q)
            const tagData = querySnap.docs.map((doc) => {
                // console.log(doc.id, '=>' , doc.data() )
                return { ...doc.data(), postId: doc.id }
            })
            console.log(tagData)
            dispatch(getTagSuccess({tagData,searchTag:tag}))
            
        } catch (error) {
            console.warn(error)
            dispatch(getTagFailed(error))
        }
    }
}