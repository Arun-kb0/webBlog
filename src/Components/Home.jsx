import React, { useEffect, useState, useMemo } from 'react'

import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus, BsBookmarkCheckFill } from 'react-icons/bs'
import { MdOutlineFavorite } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'


import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  getPost, savePost, likePost, deletePost, removeLiked,
  removeSaved, commentPost
} from '../features/redux/firebase/fireStore/firestoreActions'

import CommentBox from './CommentBox'

function Home() {
  const [postLists, setPostLists] = useState([])
  const [OpenCommentBox, setOpenCommentBox] = useState(false)
  const [commentPostId, setCommentPostId] = useState(null)
  const [addedComments, setAddedComments] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { postArray, isEmptyArray, arraySize, isPostsChanged,
    userLiked, userSaved, saveBit, likeBit, loading } = useSelector((store) => {
      return store.firestoreDB
    })

  const { isAuth, currentUser } = useSelector((store) => {
    return store.user
  })




  useEffect(() => {
    console.count("home useEffect ")
    let isCancelled = false
    
    dispatch(getPost())
    !isEmptyArray && !isCancelled
      setPostLists((prev) =>
        postArray?.map((doc) => {
          return { ...doc.data(), postId: doc.id }
        })
      )

      return()=>{
        isCancelled=true
      }

    // console.log("isPostsChanged " + isPostsChanged)
    // console.log("arraySize " + arraySize)
  }, [arraySize, likeBit, saveBit, isPostsChanged])


  const handleCommentBox = (id, comments) => {
    setOpenCommentBox(!OpenCommentBox)
    setCommentPostId(id)
    setAddedComments(comments)
    // console.log(addedComments)
  }

  return (

    <section className='home' >
      {
        postLists &&
        postLists.map((post) => {

          return <div id="postContainer" key={post.postId}>

            <div id="postHeader" className=''>
              <div className='flex justify-end'>

                {
                  isAuth && post.author.id === currentUser.user.uid &&
                  <Delete isAuth={isAuth} postId={post.postId} />
                }

                <Save isAuth={isAuth} postId={post.postId}
                  userSaved={userSaved} />

              </div>

              <div>
                <h1 className='postTitle'>{post.title}</h1>
              </div>
            </div>
            <div id="postTextContainer" className=' '>
              {post.postText}
            </div>
            <h3 className='mt-5 text-zinc-400'>@{post.author.name}</h3>

            {/* bottom row btns */}
            <div className='bottom-btns-container mt-3 flex flex-row'>
              <Like isAuth={isAuth} postId={post.postId}
                user={currentUser?.user}
                userLiked={post.liked} loading={loading}
                likeBit={likeBit} />

              <button onClick={() => handleCommentBox(post.postId, post.comments)}
                className='ml-3'>
                <CommentBtn />
              </button>
              <Share />
            </div>

            {
              OpenCommentBox && commentPostId === post.postId &&
              <CommentBox isAuth={isAuth} postId={commentPostId}
                user={currentUser?.user}
                comments={addedComments} isPostsChanged={isPostsChanged}
              />
            }

          </div>
        })
      }

    </section>
  )
}

// * like 
const Like = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLiked, setisLiked] = useState(false)
  const [LikeCount, setLikeCount] = useState(props.userLiked.length)

  const handleLiked = (id) => {
    console.log("handleLiked")
    props.isAuth && setisLiked(Boolean(
      props.userLiked?.find(uid => uid == props.user?.uid
      )))
    if (props.isAuth) {
      if (isLiked) {
        dispatch(removeLiked(id))
        setLikeCount(prev => prev - 1)
      } else {
        dispatch(likePost(id))
        setLikeCount(prev => prev + 1)
      }
      console.log(isLiked)
      setisLiked(!isLiked)

    } else
      navigate('/login')
    console.log("post liked")
    console.count(props.userLiked)
  }

  return <button onClick={() => { handleLiked(props.postId) }}
    className='flex flex-row'>
    <span className='pr-1'>{LikeCount}</span>
    {
      props.isAuth && isLiked
        ? <AiFillHeart id="bottomIcons" className='fill-red-600' />
        : <AiOutlineHeart id="bottomIcons" className='focus:bg-red-600' />
    }
  </button>
}

// * save
const Save = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setIsSaved(Boolean(
      props.userSaved?.find(pid => props.postId === pid
      )))
  })

  const handleSavePost = () => {
    if (props.isAuth) {
      isSaved ? dispatch(removeSaved(props.postId))
        : dispatch(savePost(props.postId))
      setIsSaved(!isSaved)
      console.log("saved post removed")
    } else
      navigate('/login')
    console.log("post saved")
  }

  return <button onClick={handleSavePost}>
    {
      props.isAuth && isSaved
        ? <BsBookmarkCheckFill id="topRowIcons" className='fill-slate-600 dark:fill-slate-200' />
        : <BsBookmarkPlus id="topRowIcons" className='' />

    }
  </button>
}

const Delete = (props) => {
  const dispatch = useDispatch()
  const handldeDeletePost = () => {
    dispatch(deletePost(props.postId))
    dispatch(getPost)
    console.log("post deleted")
  }

  return <button onClick={handldeDeletePost}
    className='mr-3'>
    <IoTrashBinOutline id="topRowIcons" />
  </button>
}

// * comment 
const CommentBtn = () => <FaRegComment size='22' id='bottomIcons' />

// * share
const Share = () => {
  const handelShare = () => {
    console.log("shared")
  }
  return <button onClick={handelShare} className='pl-3 '>
    <RiShareForwardLine size='24' id='bottomIcons' />
  </button>
}



export default Home