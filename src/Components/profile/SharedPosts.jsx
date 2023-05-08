import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getShared } from '../../features/redux/firebase/share/shareActions'
import Home from '../home/Home'

const SharedPosts = () => {
    const  dispatch = useDispatch()
    const {userDoc} = useSelector(state=> state.user)
    const { sharedPosts ,sharedPostsSize } = useSelector(state => state.shareReducer)
    const styles = {
      home: '',
      PostsContainers: ''
    }
  
    useEffect(()=>{
      dispatch(getShared(userDoc.userId))
    },[sharedPostsSize])
  
    return (
      <div>
        <Home
          postLists={sharedPosts}
          isProfilePost={sharedPostsSize}
          styles={styles}
        />
      </div>
    )
}

export default SharedPosts