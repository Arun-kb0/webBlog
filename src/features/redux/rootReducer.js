import {combineReducers} from 'redux'
import authReducer from  './firebase/auth/authReducer'
import firestoreReducer from './firebase/fireStore/firestoreReducer'
import commentReducer from './firebase/comment/commentReducer'
import likeReducer from './firebase/like/likeReducer'
import shareReducer from './firebase/share/shareReducer'
import hashtagReducer from './firebase/hashtag/hashtagReducer'
import followReducer from './firebase/follow/followReducer'
import searchReducer from './firebase/search/searchReducer'
import chatReducer from './firebase/chat/chatReducer'

export default combineReducers({
    user:authReducer,
    firestoreDB:firestoreReducer,
    commentReducer:commentReducer,
    likeReducer:likeReducer,
    shareReducer :shareReducer,
    hashtagReducer:hashtagReducer,
    followReducer:followReducer,
    chatReducer:chatReducer,
    
    searchReducer:searchReducer
})

