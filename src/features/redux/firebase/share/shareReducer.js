
import {
    SHARE_START, SHARE_FAILED, SHARE_SUCCESS,
    REMOVE_SHARE_FAILED, REMOVE_SHARE_START, REMOVE_SHARE_SUCCESS,
    GET_SHARE_FAILED, GET_SHARE_START, GET_SHARE_SUCCESS,
    GET_SAVED_START, GET_SAVED_SUCCESS, GET_SAVED_FAILED,
} from "../../constants";

const initialState = {
    loading: false,

    sharedRefId: null,

    savedPosts: null,
    savedPostsSize: null,

    sharedPosts:null,
    sharedPostsSize:null,
    shareBit:false

}

const shareReducer = (state = initialState, action) => {

    switch (action.type) {

        case SHARE_START:
            console.log("SHARE_START")
            return {
                ...state,
                loading: true,
            }


        case SHARE_SUCCESS:
            console.log("SHARE_SUCCESS")
            return {
                ...state,
                shareBit:!state.shareBit,
                loading: false,
            }

        case SHARE_FAILED:
            console.log("SHARE_FAILED")
            return {
                ...state,
                loading: false,
            }


        // * get shared
        case GET_SHARE_START:
            console.log("GET_SHARE_START")
            return {
                ...state,
                loading: true
            }

        case GET_SHARE_SUCCESS:
            console.log("GET_SHARE_SUCCESS")
            return {
                ...state,
                sharedPosts:action.payload,
                sharedPostsSize:action.payload.length,
                loading: false
            }

        case GET_SHARE_FAILED:
            console.log(GET_SHARE_FAILED)
            return {
                ...state,
                error:action.payload,
                loading: false
            }

        case GET_SAVED_START:
            console.log("GET_SAVED_START")
            return {
                ...state,
                loading: true
            }
        case GET_SAVED_SUCCESS:
            console.log("GET_SAVED_SUCCESS")
            return {
                ...state,
                savedPosts: action.payload,
                savedPostsSize: action.payload.length,
                loading: false
            }
        case GET_SAVED_FAILED:
            console.log("GET_SAVED_FAILED")
            return {
                ...state,
                loading: false
            }

        default:
            return {
                ...state
            }

    }
}

export default shareReducer