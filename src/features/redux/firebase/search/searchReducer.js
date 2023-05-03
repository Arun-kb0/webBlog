import { AiFillPayCircle } from "react-icons/ai";
import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILED } from "../../constants";


const initialState = {
    loading: null,
    searchData: null,
    collectionName:null ,
    searchChange:false,
    error: null,
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_START:
            console.log("SEARCH_START")
            return {
                ...state,
                loading: true
            }
        case SEARCH_SUCCESS:
            console.log("SEARCH_SUCCESS")
            return {
                ...state,
                searchData: action.payload.searchData,
                collectionName: action.payload.collectionName,
                searchChange:!state.searchChange,
                loading: false
            }

        case SEARCH_FAILED:
            console.log("SEARCH_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return {
                ...state,
            }
    }
}


export default searchReducer;