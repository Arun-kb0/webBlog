import { GET_TAG_START, GET_TAG_SUCCESS, GET_TAG_FAILED } from "../../constants";

const initialState = {
    hashtagPosts: null,
    tagChange: false,
    searchTag: null,
    loading: false,
    error: null
}

const hashtagReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TAG_START:
            console.log("GET_TAG_START")
            return {
                ...state,
                loading: true
            }

        case GET_TAG_SUCCESS:
            console.log("GET_TAG_SUCCESS")
            return {
                ...state,
                tagChange: !state.tagChange,
                hashtagPosts: action.payload.tagData,
                searchTag: action.payload.searchTag,
                loading: false
            }

        case GET_TAG_FAILED:
            console.log("GET_TAG_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return {
                ...state
            }
    }
}


export default hashtagReducer