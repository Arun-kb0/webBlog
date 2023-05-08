import {
    REGISTER_START, REGISTER_FAILED, REGISTER_SUCCESS,
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_START, LOGOUT_FAILED, LOGOUT_SUCCESS,
    SET_USER_START, SET_USER_FAILED, SET_USER_SUCCESS,
    UPLOAD_PROFILE_PIC_START, UPLOAD_PROFILE_PIC_SUCCESS, UPLOAD_PROFILE_PIC_FAILED,

} from '../../constants'


const initialState = {
    loading: false,
    currentUser: null,
    userDoc: null,
    isAuth : false,
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
                currentUser: action.payload.res,
                userDoc: action.payload.userDoc,
                isAuth: true,
                loading: false,
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
            // console.log(action.payload.userDoc)
            return {
                ...state,
                loading: false,
                currentUser: action.payload.currentUser,
                userDoc: action.payload.userDoc,
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
                currentUser: null,
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

        case SET_USER_START:
            console.log(SET_USER_START)
            return {
                ...state,
                loading: true,

            }

        case SET_USER_SUCCESS:
            console.log("SET_USER_SUCCESS")
            console.log(action.payload)
            return {
                ...state,
                currentUser: action.payload.currentUser,
                userDoc: action.payload.userDoc,
                isAuth: action.payload.currentUser ? true : false,
                loading: false,
            }

        case SET_USER_FAILED:
            console.log("SET_USER_FAILED")
            return {
                ...state,
                loading: false,

            }

        case UPLOAD_PROFILE_PIC_START:
            console.log("UPLOAD_PROFILE_PIC_START")
            return {
                ...state,
                loading: true
            }


        case UPLOAD_PROFILE_PIC_SUCCESS:
            console.log("UPLOAD_PROFILE_PIC_SUCCESS")
            return {
                ...state,
                userDoc:action.payload,
                loading: false
            }


        case UPLOAD_PROFILE_PIC_FAILED:
            console.log("UPLOAD_PROFILE_PIC_FAILED")
            return {
                ...state,
                error:action.payload,
                loading: false
            }

        default:
            return state;
    }
}

export default authReducer;
