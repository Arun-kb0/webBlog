import {
    GET_POST_START, GET_POST_SUCCESS, GET_POST_FAILED,
    SAVE_POST_START, SAVE_POST_SUCCESS, SAVE_POST_FAILED,
    LIKE_POST_START, LIKE_POST_FAILED, LIKE_POST_SUCCESS,
    ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAILED,
    DELETE_POST_FAILED, DELETE_POST_SUCCESS, DELETE_POST_START
} from "../../constants"

const initialState = {
    loading: false,
    currentUSer: null,
    postArray: null,
    isEmptyArray: true,
    arraySize: null,
    isPostsChanged: false,
    error: null,

    userLiked: [],
    likeBit:false,
    userSaved: [],
    saveBit:false,
}

const firestoreReducer = (state = initialState, action) => {
    switch (action.type) {

        // *get post cases
        case GET_POST_START:
            console.log("GET_POST_START called")
            return {
                ...state,
                loading: true
            }

        case GET_POST_SUCCESS:
            console.log("GET_POST_SUCCESS called")
            // console.log(action.payload)
            return {
                ...state,
                postArray: action.payload.docs,
                isEmptyArray: action.payload.isEmpty,
                arraySize: action.payload.size,
                isPostsChanged: false,
                loading: false,

                userLiked: action.payload.userData.likedPosts && action.payload.userData.likedPosts,
                userSaved: action.payload.userData.savedPosts && action.payload.userData.savedPosts
            }

        case GET_POST_FAILED:
            console.log("GET_POST_FAILED called")

            return {
                ...state,
                error: action.payload,
                loading: false,
            }



        // *save post cases
        case SAVE_POST_START:
            console.log("SAVE_POST_START called")
            return {
                ...state,
                loading: true
            }

        case SAVE_POST_SUCCESS:
            console.log("SAVE_POST_SUCCESS called")
            return {
                ...state,
                saveBit:!state.saveBit,
                loading: false
            }

        case SAVE_POST_FAILED:
            console.log("SAVE_POST_FAILED called")
            return {
                ...state,
                loading: false
            }


        // * like post cases
        case LIKE_POST_START:
            console.log("LIKE_POST_START called")
            return {
                ...state,
                loading: true,
            }

        case LIKE_POST_SUCCESS:
            console.log("LIKE_POST_SUCCESS called")
            return {
                ...state,
                likeBit:!state.likeBit,
                loading: false

            }

        case LIKE_POST_FAILED:
            console.log("LIKE_POST_FAILED called")
            return {
                ...state,
                loading: false
            }


        // * add post cases
        case ADD_POST_START:
            console.log("ADD_POST_START called")
            return {
                ...state,
                loading: true
            }

        case ADD_POST_SUCCESS:
            console.log("ADD_POST_SUCCESS called")
            return {
                ...state,
                loading: false,
                isPostsChanged: true
            }

        case ADD_POST_FAILED:
            console.log("ADD_POST_FAILED called")
            return {
                ...state,
                loading: false
            }

        // * deletePost cases 
        case DELETE_POST_START:
            console.log("DELETE_POST_START called")
            return {
                ...state,
                loading: true
            }

        case DELETE_POST_SUCCESS:
            console.log("DELETE_POST_SUCCESS called")
            return {
                ...state,
                loading: false
            }
        case DELETE_POST_FAILED:
            console.log("DELETE_POST_FAILED called")
            return {
                ...state,
                loading: false
            }
        // *default
        default:
            return state
    }
}

export default firestoreReducer;