import {
    GET_LIKED_START, GET_LIKED_SUCCESS, GET_LIKED_FAILED,
    LIKE_POST_START, LIKE_POST_SUCCESS, LIKE_POST_FAILED,
    REMOVE_LIKED_POST_FAILED, REMOVE_LIKED_POST_SUCCESS, REMOVE_LIKED_POST_START
} from "../../constants";

const initialState = {
    likes: null,
    likeBit: false,
    loading:false
}

const likeReducer = (state = initialState , action)=>{

    switch(action.type){

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
            likes: action.payload,
            likeBit: !state.likeBit,
            loading: false

        }

    case LIKE_POST_FAILED:
        console.log("LIKE_POST_FAILED called")
        return {
            ...state,
            loading: false
        }



    // * remove liked post cases 
    case REMOVE_LIKED_POST_START:
        console.log("REMOVE_LIKED_POST_START called")
        return {
            ...state,
            loading: true
        }

    case REMOVE_LIKED_POST_SUCCESS:
        console.log("REMOVE_LIKED_POST_SUCCESS called")
        return {
            ...state,
            likes: action.payload,
            likeBit: !state.likeBit,
            loading: false
        }
    case REMOVE_LIKED_POST_FAILED:
        console.log("REMOVE_LIKED_POST_FAILED called")
        return {
            ...state,
            loading: false
        }


    case GET_LIKED_START:
        console.log("GET_POST_START")
        return {
            ...state,
            loading: true
        }

    case GET_LIKED_SUCCESS:
        console.log("GET_POST_SUCCESS")
        return {
            ...state,
            likes:action.payload,
            loading: false,
        }
    case GET_LIKED_FAILED:
        console.log("GET_POST_FAILED")
        return {
            ...state,
            loading: false
        }
    
    default :
        return{
            ...state
        }

    }

}


export  default likeReducer