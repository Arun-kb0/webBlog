import {combineReducers} from 'redux'
import authReducer from  './firebase/auth/authReducer'
import firestoreReducer from './firebase/fireStore/firestoreReducer'
import searchReducer from './firebase/elasticSearch/searchReducer'
import commentReducer from './firebase/comment/commentReducer'
import likeReducer from './firebase/like/likeReducer'
import shareReducer from './firebase/share/shareReducer'
import hashtagReducer from './firebase/hashtag/hashtagReducer'
import followReducer from './firebase/follow/followReducer'


export default combineReducers({
    user:authReducer,
    firestoreDB:firestoreReducer,
    commentReducer:commentReducer,
    likeReducer:likeReducer,
    shareReducer :shareReducer,
    hashtagReducer:hashtagReducer,
    followReducer:followReducer,
    
    searchReducer:searchReducer
})

