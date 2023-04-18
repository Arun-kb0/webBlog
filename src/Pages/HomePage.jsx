import React, { useEffect, useState } from 'react'
import Home from '../Components/home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/redux/firebase/fireStore/firestoreActions'
import { getLiked } from '../features/redux/firebase/like/likeActions'


function HomePage() {
  const dispatch = useDispatch()
  const { postArray, isEmptyArray, arraySize, saveBit,
    isPostsChanged
  } = useSelector(state => state.firestoreDB)
  const [postLists, setPostLists] = useState(null)
  const [HomePageBit, setHomePageBit] = useState(false)

  useEffect(() => {
    let isCancelled = false
    dispatch(getPost())
    dispatch(getLiked())

    if (!isCancelled) {
      setPostLists((prev) =>
        postArray?.map((doc) => {
          return { ...doc.data(), postId: doc.id }
        })
      )
      setHomePageBit(!HomePageBit)
    }

    return (() => {
      isCancelled = true
    })

  }, [isPostsChanged, arraySize, saveBit])

  const styles={
    home:'home',
    PostsContainers:'PostsContainers'
  }

  return (
    <div className=''>
      <Home
        postLists={postLists}
        postChangeBit={HomePageBit}
        styles={styles}
      />
    </div>
  )
}

export default HomePage