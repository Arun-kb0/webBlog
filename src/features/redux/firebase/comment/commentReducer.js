import {
    COMMENT_POST_START, COMMENT_POST_SUCCESS, COMMENT_POST_FAILED,
    GET_COMMENT_FAILED, GET_COMMENT_START, GET_COMMENT_SUCCESS, DELETE_COMMENT_START, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED
} from "../../constants";

const initialState = {
    loading: null,
    comments: null,
    commentEnterd: false
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        case COMMENT_POST_START:
            console.log('COMMENT_POST_START')
            return {
                ...state,
                loading: true,
            }

        case COMMENT_POST_SUCCESS:
            console.log('COMMENT_POST_SUCCESS')
            // console.warn(action.payload)
            return {
                ...state,
                loading: false,
                comments: action.payload,
                commentEnterd: true
            }

        case COMMENT_POST_FAILED:
            console.log('COMMENT_POST_FAILED')
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_COMMENT_START:
            console.log("GET_COMMENT_START")
            return {
                ...state,
                loading: true,
                commentEnterd: false
            }

        case GET_COMMENT_SUCCESS:
            console.log("GET_COMMENT_SUCCESS")
            return {
                ...state,
                comments: action.payload,
                loading: false,
            }

        case GET_COMMENT_FAILED:
            console.log("GET_COMMENT_FAILED")
            return {
                ...state,
                loading: false,
            }

        case DELETE_COMMENT_START:
            console.log("DELETE_COMMENT_START")
            return {
                ...state,
                loading: true
            }
        case DELETE_COMMENT_SUCCESS:
            console.log("DELETE_COMMENT_SUCCESS")
            return {
                ...state,
                loading: false
            }
        case DELETE_COMMENT_FAILED:
            console.log("DELETE_COMMENT_FAILED")
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state

    }
}

export default commentReducer