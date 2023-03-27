import {
    REGISTER_START, REGISTER_FAILED, REGISTER_SUCCESS,
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_START, LOGOUT_FAILED, LOGOUT_SUCCESS
} from '../../constants'


const initialState = {
    loading: false,
    currentUser: null,
    isAuth: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        // * register user functions
        case REGISTER_START:
            console.log("REGISTER_START reducer is called")
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            console.log("REGISTER_SUCCESS reducer is called")
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuth: true
            }
        case REGISTER_FAILED:
            console.log("REGISTER_FAILED reducer is called")
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        // * login user functions
        case LOGIN_START:
            console.log("LOGIN_START reducer is called")
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS:
            console.log("LOGI_LOGIN_SUCCESS reducer is called")
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGIN_FAILED:
            console.log("LOGIN_FAILED reducer is called")
            return {
                ...state,
                loading: false,
                erorr: action.payload
            }


        // * userLogout functions
        case LOGOUT_START:
            console.log("LOGOUT_START is called ")
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            console.log("LOGOUT_SUCCESS is called")
            return {
                ...state,
                currentUser:null,
                isAuth: false,
                loading: false,
            }
        case LOGOUT_FAILED:
            console.log("LOGOUT_FAILED is called")
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}

export default authReducer;
