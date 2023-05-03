import {
    ADD_CHAT_START, ADD_CHAT_SUCCESS, ADD_CHAT_FAILED,
    SEND_MSG_START, SEND_MSG_SUCCESS, SEND_MSG_FAILED,
    GET_MSG_START, GET_MSG_SUCCESS, GET_MSG_FAILED,
    GET_USER_CHAT_START, GET_USER_CHAT_SUCCESS, GET_USER_CHAT_FAILED,
    SEARCH_USER_START, SEARCH_USER_SUCCESS, SEARCH_USER_FAILED


} from "../../constants";

const initialState = {
    loading: false,
    messages: null,
    messagesSize: null,
    chatId: null,
    chatUser: null,

    userChats: null,
    userChatsSize:null,
    foundUsers:null


}


const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CHAT_START:
            console.log("ADD_CHAT_START")
            return {
                ...state,
                loading: true,

            }

        case ADD_CHAT_SUCCESS:
            console.log("ADD_CHAT_SUCCESS")
            console.warn(action.payload)
            return {
                ...state,
                chatId: action.payload.chatId,
                chatUser: action.payload.chatUser,
                loading: false,

            }

        case ADD_CHAT_FAILED:
            console.log("ADD_CHAT_FAILED")
            return {
                ...state,
                loading: false,

            }

        // * send message
        case SEND_MSG_START:
            console.log("SEND_MSG_START")
            return {
                ...state,
                loading: false,

            }

        case SEND_MSG_SUCCESS:
            console.log("SEND_MSG_SUCCESS")
            return {
                ...state,
                loading: false,

            }

        case SEND_MSG_FAILED:
            console.log("SEND_MSG_FAILED")
            return {
                ...state,
                error: action.payload,
                loading: false,

            }

        case GET_MSG_START:
            console.log('GET_MSG_START')
            return {
                ...state,
                loading: true
            }

        case GET_MSG_SUCCESS:
            console.log('GET_MSG_SUCCESS')
            return {
                ...state,
                messages: action.payload,
                loading: false
            }

        case GET_MSG_FAILED:
            console.log('GET_MSG_FAILED')
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        // * get userChats
        case GET_USER_CHAT_START:
            console.log("GET_USER_CHAT_START")
            return {
                ...state,
                loading: true
            }

        case GET_USER_CHAT_SUCCESS:
            console.log("GET_USER_CHAT_SUCCESS")
            return {
                ...state,
                userChats: action.payload,
                userChatsSize:state.userChats && Object.values(state.userChats).length  ,
                loading: false
            }

        case GET_USER_CHAT_FAILED:
            console.log("GET_USER_CHAT_FAILED")
            return {
                ...state,
                loading: false
            }


        // * search user
        case SEARCH_USER_START:
            console.log("SEARCH_USER_START")
            return {
                ...state,
                loading: false
            }


        case SEARCH_USER_SUCCESS:
            console.log("SEARCH_USER_SUCCESS")
            return {
                ...state,
                foundUsers:action.payload,
                loading: false
            }

        case SEARCH_USER_FAILED:
            console.log("SEARCH_USER_FAILED")
            return {
                ...state,
                error:action.payload,
                loading: false
            }



        default:
            return {
                ...state
            }
    }
}


export default chatReducer