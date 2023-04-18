import {
    FOLLOW_USER_FAILED, FOLLOW_USER_START, FOLLOW_USER_SUCCESS,
    GET_USERS_FAILED, GET_USERS_START, GET_USERS_SUCCESS,
    GET_FOLLOWING_LIST_START, GET_FOLLOWING_LIST_SUCCESS, GET_FOLLOWING_LIST_FAILED,
    GET_FOLLOWERS_LIST_START, GET_FOLLOWERS_LIST_SUCCESS, GET_FOLLOWERS_LIST_FAILED,
    UNFOLLOW_USER_FAILED, UNFOLLOW_USER_START, UNFOLLOW_USER_SUCCESS
} from "../../constants";

import { db } from "../../../../firebase-config";
import {
    getDocs, arrayUnion, doc, updateDoc, collection,
    query, where, getDoc, arrayRemove, onSnapshot
} from "../../../../imports/firebaseFunctions";


// * follow and unfollow 
const followUserStart = () => {
    return {
        type: FOLLOW_USER_START
    }
}

const followUserSuccess = (followingList) => {
    return {
        type: FOLLOW_USER_SUCCESS,
        payload: followingList
    }
}

const followUserFailed = (error) => {
    return {
        type: FOLLOW_USER_FAILED,
        payload: error
    }
}

// * unfollow
const unfollowStart = () => {
    return {
        type: UNFOLLOW_USER_START
    }
}

const unfollowSuccess = (followList) => {
    return {
        type: UNFOLLOW_USER_SUCCESS,
        payload: followList
    }
}

const unfollowFailed = (error) => {
    return {
        type: UNFOLLOW_USER_FAILED,
        payload: error
    }
}


// * getuser 

const getUsersStart = () => {
    return {
        type: GET_USERS_START
    }
}

const getUsersSuccess = (userLists) => {
    return {
        type: GET_USERS_SUCCESS,
        payload: userLists
    }
}

const getUsersFailed = (error) => {
    return {
        type: GET_USERS_FAILED,
        payload: error
    }
}

// * getFollowingList

const getFollowingListSart = () => {
    return {
        type: GET_FOLLOWING_LIST_START
    }
}

const getFollowingListSuccess = (userFollowList) => {
    return {
        type: GET_FOLLOWING_LIST_SUCCESS,
        payload: userFollowList

    }
}

const getFollowingListFailed = (error) => {
    return {
        type: GET_FOLLOWING_LIST_FAILED,
        payload: error
    }
}


// *getFollowersList
const getFollowersListStart = () => {
    return {
        type: GET_FOLLOWERS_LIST_START
    }
}

const getFollowersListSuccess = (followersList) => {
    return {
        type: GET_FOLLOWERS_LIST_SUCCESS,
        payload: followersList

    }
}

const getFollowersListFailed = (error) => {
    return {
        type: GET_FOLLOWERS_LIST_FAILED,
        payload: error

    }
}



export const getUsers = (userDoc) => {

    return async function (dispatch) {
        dispatch(getUsersStart())
        try {
            const usersRef = collection(db, "users")
            const q = query(usersRef,
                where('userId', '!=', `${userDoc.userId}`),

            )
            const res = await getDocs(q)
            const userLists = res.docs.map((doc) => {
                return doc.data()
            })
            console.log(userLists)

            dispatch(getUsersSuccess(userLists))
        } catch (error) {
            console.log(error)
            dispatch(getUsersFailed(error))
        }
    }
}


// * follow async 
export const followUser = ({ username, uid, followColId, currentUserId, currentUserName }) => {
    return async function (dispatch) {

        dispatch(followUserStart())
        console.log(followColId)

        try {
            const followRef = doc(db, 'follow', followColId)
            await updateDoc(followRef, {
                following: arrayUnion({ uid, username }),
                ownerId: currentUserId,
                ownerName: currentUserName
            })
            const res = await getDoc(followRef)
            const followDoc = res.data()
            console.log(followDoc.following)
            dispatch(followUserSuccess(followDoc.following))
        } catch (error) {
            console.error(error)
            dispatch(followUserFailed(error))
        }

    }
}

// * unfollow async
export const unfollowUser = ({ username, uid, followColId, currentUserId, currentUserName }) => {
    return async function (dispatch) {

        dispatch(unfollowStart())
        try {
            const followRef = doc(db, 'follow', followColId)
            await updateDoc(followRef, {
                following: arrayRemove({ uid, username })
            })
            const res = await getDoc(followRef)
            const followDoc = res.data()
            console.log(followDoc.following)
            dispatch(unfollowSuccess(followDoc.following))
        } catch (error) {
            console.error(error)
            dispatch(unfollowFailed(error))

        }
    }
}

// * getUserFollowList async
export const getUserFollowList = ({ followColId }) => {
    return async function (dispatch) {

        dispatch(getFollowingListSart())
        try {

            const followRef = doc(db, 'follow', followColId)
            const res = await getDoc(followRef)
            const followDoc = res.data()
            // console.log(followDoc.following)

            dispatch(getFollowingListSuccess(followDoc.following))
        } catch (error) {
            console.log(error)
            dispatch(getFollowingListFailed(error))
        }
    }
}

// * getFollowersList async
export const getFollowersList = ({ uid, username, followDocId }) => {
    return async function (dispatch) {
        dispatch(getFollowersListStart())

        try {
            const followCol = collection(db, 'follow')
            const followRef = doc(db, 'follow', followDocId)

            const q = query(followCol,
                where("following", 'array-contains', { uid, username })
            )
            const snap = await getDocs(q)
            let followersList = snap.docs.map((item) => {
                return {
                    uid: item.data().ownerId,
                    username: item.data().ownerName
                }
            })

            await updateDoc(followRef, {
                followers: followersList
            })
            console.log(followersList)
            dispatch(getFollowersListSuccess(followersList))

        } catch (error) {
            console.log(error)
            dispatch(getFollowersListFailed())
        }
    }
}
