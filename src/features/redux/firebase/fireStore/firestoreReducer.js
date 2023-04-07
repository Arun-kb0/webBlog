import {
    GET_POST_START, GET_POST_SUCCESS, GET_POST_FAILED,
    SAVE_POST_START, SAVE_POST_SUCCESS, SAVE_POST_FAILED,
    ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAILED,
    DELETE_POST_FAILED, DELETE_POST_SUCCESS, DELETE_POST_START,
    REMOVE_SAVED_POST_START, REMOVE_SAVED_POST_SUCCESS, REMOVE_SAVED_POST_FAILED,
} from "../../constants"

const initialState = {
    loading: false,
    currentUSer: null,
    postArray: null,
    isEmptyArray: true,
    arraySize: null,
    isPostsChanged: false,
    error: null,

    likeBit: false,
    userSaved: [],
    saveBit: false,
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
            console.log(action.payload.docs)
            return {
                ...state,
                postArray: action.payload.docs,
                isEmptyArray: action.payload.isEmpty,
                arraySize: action.payload.size,
                loading: false,

                userSaved: action.payload.userData?.savedPosts


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
                saveBit: !state.saveBit,
                loading: false
            }

        case SAVE_POST_FAILED:
            console.log("SAVE_POST_FAILED called")
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
                isPostsChanged: !state.isPostsChanged
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
                isPostsChanged: !state.isPostsChanged,
                loading: false
            }
        case DELETE_POST_FAILED:
            console.log("DELETE_POST_FAILED called")
            return {
                ...state,
                loading: false
            }




        // * remove saved cases 
        case REMOVE_SAVED_POST_START:
            console.log("REMOVE_SAVED_POST_START called")
            return {
                ...state,
                loading: true
            }
            0
        case REMOVE_SAVED_POST_SUCCESS:
            console.log("REMOVE_SAVED_POST_SUCCESS called")
            return {
                ...state,
                saveBit: !state.saveBit,
                loading: false
            }
        case REMOVE_SAVED_POST_FAILED:
            console.log("REMOVE_SAVED_POST_FAILED called")
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