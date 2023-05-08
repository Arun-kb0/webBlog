import {
    ADD_CHAT_START, ADD_CHAT_SUCCESS, ADD_CHAT_FAILED,
    SEND_MSG_START, SEND_MSG_SUCCESS, SEND_MSG_FAILED,
    GET_MSG_START, GET_MSG_SUCCESS, GET_MSG_FAILED,
    GET_USER_CHAT_START, GET_USER_CHAT_SUCCESS, GET_USER_CHAT_FAILED,
    SEARCH_USER_START, SEARCH_USER_SUCCESS, SEARCH_USER_FAILED
} from "../../constants";
import { auth, db, storage } from "../../../../firebase-config";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, onSnapshot, query ,
    arrayUnion, collection, where, getDocs,Timestamp,
    ref, uploadBytesResumable, getDownloadURL
} from "../../../../imports/firebaseFunctions";
import { v4 as uuid } from "uuid";



const addChatStart = () => {
    return {
        type: ADD_CHAT_START
    }
}

const addChatSuccess = (data) => {
    return {
        type: ADD_CHAT_SUCCESS,
        payload: data
    }
}

const addChatFaied = () => {
    return {
        type: ADD_CHAT_FAILED
    }
}


const sendMessageStart = () => {
    return {
        type: SEND_MSG_START
    }
}



const sendMessageSuccess = () => {
    return {
        type: SEND_MSG_SUCCESS
    }
}


const sendMessageFailed = (erorr) => {
    return {
        type: SEND_MSG_FAILED,
        payload: erorr
    }
}


// * getMessages
const getMessagesStart = () => {
    return {
        type: GET_MSG_START,
    }
}

const getMessagesSuccess = (messages) => {

    return {
        type: GET_MSG_SUCCESS,
        payload: messages
    }
}

const getMessagesFailed = (erorr) => {
    return {
        type: GET_MSG_FAILED,
        payload: erorr
    }
}

// * getUserChat
const getUserChatStart = () => {
    return {
        type: GET_USER_CHAT_START
    }
}

const getUserChatSuccess = (userChats) => {
    return {
        type: GET_USER_CHAT_SUCCESS,
        payload: userChats
    }
}

const getUserChatFailed = (erorr) => {
    return {
        type: GET_USER_CHAT_FAILED,
        payload: erorr
    }
}

// * search User
const searchUserStart = () => {
    return {
        type: SEARCH_USER_START
    }
}

const searchUserSuccess = (usersList) => {
    return {
        type: SEARCH_USER_SUCCESS,
        payload: usersList
    }
}

const searchUserFailed = (erorr) => {
    return {
        type: SEARCH_USER_FAILED,
        payload: erorr
    }
}

// * add to chat
export const addChat = (user) => {
    return async function (dispatch) {
        dispatch(addChatStart())
        console.warn(user)
        // console.log(auth.currentUser.uid)
        try {
            const chatId = user.uid > auth.currentUser.uid
                ? user.uid + auth.currentUser.uid
                : auth.currentUser.uid + user.uid
            const currentUserChatRef = doc(db, 'userChats', auth.currentUser.uid)
            const msgRef = doc(db, 'chat', chatId)

            let msgDoc = await getDoc(msgRef)

            if (!msgDoc.exists()) {
                await setDoc(msgRef, { messages: [] })

                await updateDoc(currentUserChatRef, {
                    [chatId]: {
                        date: serverTimestamp(),
                        lastMessage: null,
                        userInfo: {
                            displayName: user.username,
                            uid: user.uid,
                            photoURL: user?.photoURL
                        }
                    }
                })

                const userChatRef = doc(db, 'userChats', user.uid)
                await updateDoc(userChatRef, {
                    [chatId]: {
                        date: serverTimestamp(),
                        lastMessage: null,
                        userInfo: {
                            displayName: auth.currentUser.displayName,
                            uid: auth.currentUser.uid,
                            photoURL: auth.currentUser?.photoURL
                        }
                    }
                })
                console.warn("doc created !!")
            }

            console.warn(msgDoc.data())
            dispatch(addChatSuccess({ chatId, chatUser: user, messages: msgDoc.data() }))
        } catch (error) {
            console.log(error)
            dispatch(addChatFaied(error))
        }
    }
}

// * send message
export const sendMessage = (data) => {
    return async function (dispatch) {
        console.warn(data)
        dispatch(sendMessageStart())
        try {
            if (data.img) {
                const storageRef = ref(storage, `chatImages/${uuid()}`)
                const uploadTask = uploadBytesResumable(storageRef, data.img)


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

                                const chatRef = doc(db, "chat", data.chatId)
                                await updateDoc(chatRef, {
                                    messages: arrayUnion({
                                        id: uuid(),
                                        text: data.text,
                                        senderId: auth.currentUser.uid,
                                        data: Timestamp.now(),
                                        img: downloadURL

                                    })
                                })
                                console.warn("img uploaded !!")
                            });
                    }
                );

            } else {
                const chatRef = doc(db, "chat", data.chatId)
                await updateDoc(chatRef, {
                    messages: arrayUnion({
                        id: uuid(),
                        text: data.text,
                        senderId: auth.currentUser.uid,
                        data: Timestamp.now()
                    })
                })
                console.warn("message sended!!")
            }

            const currentUserChatRef = doc(db, "userChats", auth.currentUser.uid)
            await updateDoc(currentUserChatRef, {
                [data.chatId + ".lastMessage"]: data.text,
                [data.chatId + ".date"]: serverTimestamp()
            })
            const userChatRef = doc(db, "userChats", data.chatUser.uid)
            await updateDoc(userChatRef, {
                [data.chatId + ".lastMessage"]: data.text,
                [data.chatId + ".date"]: serverTimestamp()
            })

            dispatch(sendMessageSuccess())
        } catch (error) {
            console.log(error)
            dispatch(sendMessageFailed(error))
        }
    }
}


export const getMessages = (chatId) => {
    return async function (dispatch) {
        dispatch(getMessagesStart())
        console.log(chatId)
        try {

            const chatRef = doc(db, "chat", chatId)
            const unsub = onSnapshot(chatRef, (doc) => {
                console.warn(doc.data().messages)

                dispatch(getMessagesSuccess(doc.data().messages))
            })
            //    return unsub()

        } catch (erorr) {
            console.log(erorr)
            dispatch(getMessagesFailed(erorr))
        }
    }
}


export const getUserChat = () => {
    return async function (dispatch) {
        dispatch(getUserChatStart())
        try {

            const currentUserChatRef = doc(db, 'userChats', auth.currentUser.uid)
            const chatData = await getDoc(currentUserChatRef)
            console.warn(chatData.data())

            dispatch(getUserChatSuccess(chatData.data()))
        } catch (erorr) {
            console.error(erorr)
            dispatch(getUserChatFailed(erorr))

        }
    }
}

export const searchUser = (searchString) => {
    return async function (dispatch) {
        dispatch(searchUserStart())
        console.log(searchString.length)
        try {

            let usersList = null
            if (searchString.length > 0) {
                const userCol = collection(db, 'users')
                const q = query(userCol,
                    where("name", '>=', searchString),
                    where("name", '<=', searchString + "\uf8ff"),
                )
                const users = await getDocs(q);
                usersList = users.docs.map((user) => {
                    if (user.data().userId != auth.currentUser.uid)
                        return user.data()
                })
                console.log(usersList)

                const currentUserChatRef = doc(db, 'userChats', auth.currentUser.uid)
                const chatData = await getDoc(currentUserChatRef)
                console.warn(chatData.data())

            }

            dispatch(searchUserSuccess(usersList))

        } catch (error) {
            console.error(error)
            dispatch(searchUserFailed())

        }
    }
}
