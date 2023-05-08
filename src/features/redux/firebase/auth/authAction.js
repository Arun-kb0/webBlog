import {
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILED,
    SET_USER_START, SET_USER_FAILED, SET_USER_SUCCESS,
    UPLOAD_PROFILE_PIC_START, UPLOAD_PROFILE_PIC_SUCCESS, UPLOAD_PROFILE_PIC_FAILED,
} from '../../constants'

import { auth, db, storage } from '../../../../firebase-config'
import {
    createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
    signOut, doc, setDoc, getDoc, collection, addDoc, updateDoc,
    getDownloadURL, ref, uploadBytesResumable
} from '../../../../imports/firebaseFunctions'




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

const loginSuccess = (data) => {
    console.log("loginStart called")
    console.log(data)
    return {
        type: LOGIN_SUCCESS,
        payload: data

    }
}

const loginFailed = (error) => {
    console.log("logiFalied called")
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}

//*  logout actions 
const logoutStart = () => {
    console.log("logout start");
    return {
        type: LOGOUT_START
    }
}

const logoutSuccess = () => {
    console.log("logout success");
    return {
        type: LOGOUT_SUCCESS
    }
}

const logoutFalied = (error) => {
    console.log("logout success");
    return {
        type: LOGOUT_FAILED,
        payload: error
    }
}


// * setUser
const setUserStart = () => {
    return {
        type: SET_USER_START,

    }
}

const setUserSuccess = (data) => {
    return {
        type: SET_USER_SUCCESS,
        payload: data
    }
}

const setUserFailed = (error) => {
    return {
        type: SET_USER_FAILED,
        payload: error
    }
}


const uploadProfilePicStart = () => {
    return {
        type: UPLOAD_PROFILE_PIC_START
    }
}


const uploadProfilePicSuccess = (userDoc) => {
    return {
        type: UPLOAD_PROFILE_PIC_SUCCESS,
        payload: userDoc
    }
}


const uploadProfilePicFailed = (error) => {
    return {
        type: UPLOAD_PROFILE_PIC_FAILED,
        payload: error
    }
}





// * async operations 

// * register user 
export const registerInitiate = (Email, Password, displayName) => {
    return async function (dispatch) {

        // console.log("registerInitiate called ")
        dispatch(registerStart())
        try {
            const res = await createUserWithEmailAndPassword(auth, Email, Password)
            updateProfile(auth.currentUser, { displayName })
            localStorage.setItem("isAuth", true)

            //* creating user collection firestore  
            const shareRef = collection(db, 'share')
            const shareDoc = await addDoc(shareRef, {})
            const shareSnap = await getDoc(shareDoc)

            const followRef = collection(db, 'follow')
            const followDoc = await addDoc(followRef, {})
            const followSnap = await getDoc(followDoc)

            const userChatDoc = doc(db, "userChats", auth.currentUser.uid)
            await setDoc(userChatDoc, {})

            const userDocRef = doc(db, "users", auth.currentUser.uid)
            await setDoc(userDocRef, {
                name: displayName,
                userId: auth.currentUser.uid,
                savedPosts: [],
                shareRef: shareSnap.id,
                followRef: followSnap.id,
            })

            const userDoc = await getDoc(userDocRef)

            console.warn(userDoc)
            console.warn(res)
            dispatch(registerSuccess({ res, userDoc: userDoc.data() }))



        } catch (error) {
            console.error(error)
            dispatch(registerFaild(error.message))
        }
    }
}

// * login user
export const userLogin = (data) => {
    return async function (dispatch) {
        // console.log("userLogin called ")
        console.log(data)
        dispatch(loginStart())
        try {
            const currentUser = await signInWithEmailAndPassword(auth, data.Email, data.Password)
            console.warn(currentUser)
            localStorage.setItem("isAuth", true)

            const userRef = doc(db, "users", auth.currentUser.uid)
            const userDoc = await getDoc(userRef)

            dispatch(loginSuccess({ currentUser, userDoc: userDoc.data() }))
        } catch (erorr) {
            console.log(erorr)
            dispatch(loginFailed(erorr))

        }

    }
}

// * logout user
export const userLogout = () => {
    // console.log("userLogout called")
    return async function (dispatch) {
        dispatch(logoutStart())
        try {
            await signOut(auth)
            localStorage.removeItem("isAuth")
            localStorage.removeItem("userDoc")
            dispatch(logoutSuccess())
        } catch (error) {
            console.log(error)
            dispatch(logoutFalied(error))
        }
    }
}

// * upload image async
export const uploadProfilePic = ({ file, filename }) => {
    return async function (dispatch) {
        dispatch(uploadProfilePicStart())

        try {
            const storageRef = ref(storage, auth.currentUser.uid + filename)
            const uploadTask = uploadBytesResumable(storageRef, file)


            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            console.log('File available at', downloadURL);
                            const userDocRef = doc(db, "users", auth.currentUser.uid)

                            let userDoc
                            if (filename.length === 0) {
                                await updateDoc(userDocRef, {
                                    photoURL: downloadURL
                                })
                                await updateProfile(auth.currentUser, {
                                    photoURL: downloadURL
                                })

                                userDoc = await getDoc(userDocRef)
                            }else{
                                await updateDoc(userDocRef, {
                                    coverPhotoURL: downloadURL
                                })

                                userDoc = await getDoc(userDocRef)
                            }

                            console.log(userDoc.data())
                            dispatch(uploadProfilePicSuccess(userDoc.data()))
                        });
                }
            );

            // dispatch(uploadProfilePicSuccess())
        } catch (error) {
            console.error(error)
            dispatch(uploadProfilePicFailed(error))
        }
    }
}


export const setUser = (user) => {
    return async function (dispatch) {
        console.warn("login check")
        console.warn(user)
        dispatch(setUserStart())
        try {
            if (user) {
                const userRef = doc(db, "users", user?.uid)
                const userDoc = await getDoc(userRef)
                const currentUser = { user: user }
                dispatch(setUserSuccess({ currentUser, userDoc: userDoc.data() }))
            } else {
                dispatch(setUserSuccess({ currentUser: null, userDoc: null }))
            }
        } catch (erorr) {
            console.log(erorr)
            dispatch(setUserFailed(erorr))
        }
    }
}