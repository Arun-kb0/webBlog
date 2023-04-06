import {combineReducers} from 'redux'
import authReducer from  './firebase/auth/authReducer'
import firestoreReducer from './firebase/fireStore/firestoreReducer'
import searchReducer from './firebase/elasticSearch/searchReducer'
import commentReducer from './firebase/comment/commentReducer'


export default combineReducers({
    user:authReducer,
    firestoreDB:firestoreReducer,
    commentReducer:commentReducer,
    
    searchReducer:searchReducer
})

