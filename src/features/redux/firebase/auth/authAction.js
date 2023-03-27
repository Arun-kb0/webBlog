import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED, 
    LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS ,
    LOGOUT_START,LOGOUT_SUCCESS,LOGOUT_FAILED} from '../../constants'
import { auth, db } from '../../../../firebase-config'
import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

// * register user
const registerStart = () => {
    console.log("registerStart createUser called")
    return {
        type: REGISTER_START,
    }
}

const registerSuccess = (user) => {
    console.log("registerSuccess createUser called")
    console.log(user)
    return {
        type: REGISTER_SUCCESS,
        payload: user
    }
}

const registerFaild = (error) => {
    console.log("registerFaild createUser called")
    console.log(error)
    return {
        type: REGISTER_FAILED,
        payload: error
    }
}

// *login actions
const loginStart = () => {
    console.log("loginStart called")
    return {
        type: LOGIN_START
    }
}

const loginSuccess = (user) => {
    console.log("loginStart called")
    return {
        type: LOGIN_SUCCESS,
        payload:user
    }
}

const loginFailed = (error) => {
    console.log("logiFalied called")
    return {
        type: LOGIN_FAILED,
        payload:error
    }
}

//*  logout actions 
const logoutStart = ()=>{
    console.log("logout start");
    return{
        type:LOGOUT_START
    }
}

const logoutSuccess=()=>{
    console.log("logout success");
    return{
        type:LOGOUT_SUCCESS 
    }
}

const logoutFalied=(error)=>{
    console.log("logout success");
    return{
        type:LOGOUT_FAILED,
        payload:error
    }
}



// * async operations 

// * register user 
export const registerInitiate = (Email, Password, displayName) => {
    return async function (dispatch) {

        console.log("registerInitiate called ")
        dispatch(registerStart())
        try {
            const res = await createUserWithEmailAndPassword(auth, Email, Password)
            updateProfile(auth.currentUser, { displayName })
            localStorage.setItem("isAuth", true)

            //* creating user collection firestore  
            const userCollectionRef = doc(db, "users", auth.currentUser.uid)
            await setDoc(userCollectionRef, {
                name: displayName,
                userId: auth.currentUser.uid,
                likedPosts: [],
                savedPosts: []
            })

            dispatch(registerSuccess(res))

        } catch (error) {
            console.log(error)
            dispatch(registerFaild(error.message))
        }
    }
}

// * login user
export const userLogin =(data)=>{
    return async function (dispatch){
        console.log("userLogin called ")
        console.log(data)
        dispatch(loginStart())
        try{
            const res=await signInWithEmailAndPassword(auth,data.Email,data.Password)
            console.log(res)
            localStorage.setItem("isAuth",true)
            dispatch(loginSuccess(res))
        }catch(erorr){
            console.log(erorr)
            dispatch(loginFailed(erorr))

        }

    }
}

// * logout user
export const userLogout = ()=>{
    console.log("userLogout called")
    return async function (dispatch){
        dispatch(logoutStart())
        try{
            await signOut(auth)
            localStorage.removeItem("isAuth")
            dispatch(logoutSuccess())
        }catch(error){
            console.log(error)
            dispatch(logoutFalied(error))
        }
    }
}
