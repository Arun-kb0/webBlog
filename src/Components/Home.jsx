import React, { useEffect, useState } from 'react'
import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus, BsBookmarkCheckFill } from 'react-icons/bs'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { MdOutlineFavorite } from 'react-icons/md'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getPost, savePost, likePost, deletePost, removeLiked, removeSaved } from '../features/redux/firebase/fireStore/firestoreActions'

function Home() {
  const [postLists, setPostLists] = useState([])
  let [changeBit, setChangeBit] = useState(false)

  const dispatch = useDispatch()
  const { postArray, isEmptyArray, arraySize, isPostsChanged,
    userLiked, userSaved, saveBit, likeBit } = useSelector((store) => {
      return store.firestoreDB
    })

  const { isAuth, currentUser } = useSelector((store) => {
    return store.user
  })

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPost())
    console.log("post fetched ")

    isEmptyArray == false && setPostLists((prev) =>
      postArray.map((doc) => {
        // console.log(doc.data())
        return { ...doc.data(), postId: doc.id }
      })
    )

  }, [arraySize, changeBit])


  // * delete post
  const handldeDeletePost = (id) => {
    dispatch(deletePost(id))
    dispatch(getPost)
    setChangeBit(!changeBit)
    console.log("post deleted")
    
  }

  // *  save post
  const handleSavePost = (id) => {
    const isSaved = Boolean(userSaved.find(pid => (
      id === pid
    )))
    if (isAuth) {
      isSaved ? dispatch(removeSaved(id))
        : dispatch(savePost(id))
      console.log("saved post removed")
    } else
      navigate('/login')

    setChangeBit(!changeBit)
    console.log("post saved")
  }

  // * like post
  const handleLiked = (id) => {
    const isLiked = Boolean(userLiked.find(pid => (
      id === pid
    )))

    console.warn("isLiked " + isLiked)
    if (isAuth) {
      isLiked ? dispatch(removeLiked(id))
        : dispatch(likePost(id))
      console.log("likeed post removed")
    } else
      navigate('/login')

    setChangeBit(!changeBit)
    console.log("post liked")
  }


  return (

    <section className='home' >
      {
        postLists &&
        postLists.map((post) => {

          return <div id="postContainer" key={post.postId}>

            <div id="postHeader" className=''>
              <div className='flex justify-end'>
                <div className='mr-5'>
                  {
                    isAuth && post.author.id === currentUser.user.uid &&
                    <button onClick={() => {
                      handldeDeletePost(post.postId)
                    }}>
                      <IoTrashBinOutline id="topRowIcons" />
                    </button>
                  }
                </div>

                <div >
                  {/* * save btn */}
                  <button onClick={() => { handleSavePost(post.postId) }}>
                    {
                      isAuth && Boolean(userSaved.find(id => id === post.postId))
                        ? <BsBookmarkCheckFill id="topRowIcons" className='fill-slate-600 dark:fill-slate-200' />
                        : <BsBookmarkPlus id="topRowIcons" className='' />

                    }
                  </button>
                </div>

              </div>

              <div>
                <h1 className='postTitle'>{post.title}</h1>
              </div>
            </div>
            <div id="postTextContainer" className=' '>
              {post.postText}
            </div>
            <h3 className='mt-5 text-zinc-400'>@{post.author.name}</h3>

            <div className='mt-2'>

              {/* like btn */}
              <div>
                <button className=''
                  onClick={() => { handleLiked(post.postId) }}>
                  {
                    // isAuth && Boolean(liked.find(id => id === post.postId)) 
                    isAuth && Boolean(userLiked.find(id => id === post.postId))
                      ? <IoIosHeart id="bottomIcons" className='fill-red-600' />
                      : <IoIosHeartEmpty id="bottomIcons" className='focus:bg-red-600' />
                  }
                </button>
              </div>

            </div>
          </div>
        })
      }

    </section>
  )
}


export default Home