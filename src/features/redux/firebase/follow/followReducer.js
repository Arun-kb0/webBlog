import {
    FOLLOW_USER_FAILED, FOLLOW_USER_START, FOLLOW_USER_SUCCESS,
    GET_USERS_FAILED, GET_USERS_START, GET_USERS_SUCCESS,
    GET_FOLLOWING_LIST_START, GET_FOLLOWING_LIST_SUCCESS, GET_FOLLOWING_LIST_FAILED,
    GET_FOLLOWERS_LIST_START, GET_FOLLOWERS_LIST_SUCCESS, GET_FOLLOWERS_LIST_FAILED,
    UNFOLLOW_USER_FAILED, UNFOLLOW_USER_START, UNFOLLOW_USER_SUCCESS

} from "../../constants";


const initialstate = {
    loading: false,

    following: null,
    followingSize: null,
    followArrayChange: false,

    followers: null,
    followersSize: null,

    usersList: null,
    usersListSize: null,

    error: null

}

const followReducer = (state = initialstate, action) => {

    switch (action.type) {

        // * follow and 
        case FOLLOW_USER_START:
            console.log('FOLLOW_USER_START')
            return {
                ...state,

                loading: true
            }

        case FOLLOW_USER_SUCCESS:
            console.log('FOLLOW_USER_SUCCESS')
            return {
                ...state,
                following: action.payload,
                followingSize: action.payload.length,
                followArrayChange: true,
                loading: false
            }

        case FOLLOW_USER_FAILED:
            console.log('FOLLOW_USER_FAILED')
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        // *unfollow
        case UNFOLLOW_USER_START:
            console.log("UNFOLLOW_USER_START")
            return {
                ...state,
                loading: true
            }

        case UNFOLLOW_USER_SUCCESS:
            console.log("UNFOLLOW_USER_SUCCESS")
            return {
                ...state,
                following: action.payload,
                followingSize: action.payload.length,
                loading: false
            }

        case UNFOLLOW_USER_FAILED:
            console.log("UNFOLLOW_USER_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false
            }



        // *get users
        case GET_USERS_START:
            console.log("GET_USERS_START")
            return {
                ...state,
                loading: true,

            }

        case GET_USERS_SUCCESS:
            console.log("GET_USERS_SUCCESS")
            return {
                ...state,
                usersList: action.payload,
                usersListSize: action.payload?.length,
                loading: false,

            }

        case GET_USERS_FAILED:
            console.log("GET_USERS_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false,

            }


        // * user following list
        case GET_FOLLOWING_LIST_START:
            console.log("GET_FOLLOWING_LIST_START")
            return {
                ...state,
                loading: true
            }

        case GET_FOLLOWING_LIST_SUCCESS:
            console.log("GET_FOLLOWING_LIST_SUCCESS")
            return {
                ...state,
                following: action.payload,
                followUsersSize: action.payload.length,
                followArrayChange: true,
                loading: false
            }

        case GET_FOLLOWING_LIST_FAILED:
            console.log("GET_FOLLOWING_LIST_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        // * follwers list
        case GET_FOLLOWERS_LIST_START:
            console.log("GET_FOLLOWERS_LIST_START")
            return {
                ...state,
            }

        case GET_FOLLOWERS_LIST_SUCCESS:
            console.log("GET_FOLLOWERS_LIST_SUCCESS")
            return {
                ...state,
                followers:action.payload,
                loading:false
            }


        case GET_FOLLOWERS_LIST_FAILED:
            console.log("GET_FOLLOWERS_LIST_FAILED")
            return {
                ...state,
                error:action.payload,
                loading:false
            }


        default:
            return {
                ...state
            }
    }
}

export default followReducer