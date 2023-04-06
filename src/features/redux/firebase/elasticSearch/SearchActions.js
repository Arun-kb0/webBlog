import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILED } from "../../constants";

const searchStart = () => {
    return {
        type: SEARCH_START
    }
}

const searchSuccess = () => {
    return {
        type: SEARCH_SUCCESS
    }
}


const searchFailed = () => {
    return {
        type: SEARCH_FAILED
    }
}


export const search = (data) => {
    console.log("search async call")
    
    return async function (dispatch) {

        dispatch(searchStart())
        console.log(data)
        try {
            dispatch(searchSuccess())
        } catch (error) {

            dispatch(searchFailed())
        }

    }
}

