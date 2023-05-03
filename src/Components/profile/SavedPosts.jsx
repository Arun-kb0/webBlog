import React, { useDebugValue, useEffect,useState } from 'react'
import Home from '../home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../../features/redux/firebase/share/shareActions'

const SavedPosts = (props) => {
  const  dispatch = useDispatch()
  const [savedChange, setSavedChange] = useState(false)
  const { userSaved } = useSelector(state => state.firestoreDB)
  const { savedPosts,savedPostsSize } = useSelector(state => state.shareReducer)
  const styles = {
    home: '',
    PostsContainers: ''
  }

  useEffect(()=>{
    dispatch(getSavedPosts(userSaved))
    setSavedChange(prev => !prev)
    console.log(savedPosts)
  },[savedPostsSize])

  return (
    <div>
      <Home
        postLists={savedPosts}
        isProfilePost={savedChange}
        styles={styles}
      />
    </div>
  )
}

export default SavedPosts