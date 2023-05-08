import {
    GET_LIKED_START, GET_LIKED_SUCCESS, GET_LIKED_FAILED,
    LIKE_POST_START, LIKE_POST_SUCCESS, LIKE_POST_FAILED,
    REMOVE_LIKED_POST_FAILED, REMOVE_LIKED_POST_SUCCESS, REMOVE_LIKED_POST_START
} from "../../constants";
import { db, auth } from "../../../../firebase-config";

import {
    collection, getDocs, doc, updateDoc,writeBatch,
    arrayUnion, getDoc, arrayRemove, increment,

} from '../../../../imports/firebaseFunctions'

// * like post
const likePostStart = () => {
    return {
        type: LIKE_POST_START
    }
}
const likePostSuccess = (data) => {
    return {
        type: LIKE_POST_SUCCESS,
        payload: data
    }
}
const likePostFailed = (error) => {
    return {
        type: LIKE_POST_FAILED,
        payload: error
    }
}



//  * remove likded post
const removeLikdePostStart = () => {
    return {
        type: REMOVE_LIKED_POST_START
    }
}
const removeLikdePostSuccess = (data) => {
    return {
        type: REMOVE_LIKED_POST_SUCCESS,
        payload: data
    }
}
const removeLikdePostFailed = (error) => {
    return {
        type: REMOVE_LIKED_POST_FAILED,
        payload: error
    }
}


// getLike posts
const getLikedPostStart = () => {
    return {
        type: GET_LIKED_START
    }
}

const getLikedPostSuccess = (data) => {
    return {
        type: GET_LIKED_SUCCESS,
        payload: data

    }
}

const getLikedPostFailed = (error) => {
    return {
        type: GET_LIKED_FAILED,
        payload: error
    }
}



// * like post async
export const likePost = ({ id, likeId }) => {

    return async function (dispatch) {
        console.log("likePost called")
        dispatch(likePostStart())

        try {
         
            const likeRef = doc(db, 'likes', likeId)
            const postRef = doc(db, 'posts', id)
            const batch = writeBatch(db)
            batch.update(likeRef, {
                postId: id,
                liked: arrayUnion(`${auth.currentUser.uid}`)
            })
            batch.update(postRef, {
                likeCount: increment(1)
            })
            await batch.commit()
            console.log('Batch write successful');
            dispatch(likePostSuccess())

        } catch (error) {
            console.log(error)
            dispatch(likePostFailed(error))
        }



    }
}

// remove liked
export const removeLiked = ({ id, likeId }) => {
    return async function (dispatch) {
        // console.log("remove liked called")
        console.log(id)
        dispatch(removeLikdePostStart())

        try {
            const likeRef = doc(db, 'likes', likeId)
            const postRef = doc(db, 'posts', id)
            const batch = writeBatch(db)
            batch.update(likeRef, {
                liked: arrayRemove(`${auth.currentUser.uid}`)
            })
            batch.update(postRef, {
                likeCount: increment(-1)
            })
            await batch.commit()
            console.log('Batch write successful');
            dispatch(removeLikdePostSuccess())

            // dispatch(removeLikdePostSuccess(res.data()))
        } catch (error) {
            console.log(error)
            dispatch(removeLikdePostFailed(error))
        }
    }
}

export const getLiked = () => {
    return async function (dispatch) {
        dispatch(getLikedPostStart())
        try {
            const likeRef = collection(db, "likes")
            const res = await getDocs(likeRef)
            const data = {}
            res.forEach((doc) => {
                data[doc.data().postId] = doc.data().liked
            })

            dispatch(getLikedPostSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(getLikedPostFailed(error))
        }

    }

}
