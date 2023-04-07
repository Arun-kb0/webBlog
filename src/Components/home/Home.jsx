import React, { useEffect, useState } from 'react'

import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus, BsBookmarkCheckFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  getPost, savePost, deletePost, removeSaved,
  // removeLiked,likePost, getLiked
} from '../../features/redux/firebase/fireStore/firestoreActions'

import {likePost,getLiked,removeLiked  } from '../../features/redux/firebase/like/likeActions'

import CommentBox from './CommentBox'
import HomePageLoad from './HomePageLoad'

function Home(props) {
  const [postLists, setPostLists] = useState([])
  const [OpenCommentBox, setOpenCommentBox] = useState(false)
  const [commentPostId, setCommentPostId] = useState(null)
  const [styles, setStyles] = useState({
    home: 'home',
    PostsContainers: 'PostsContainers'
  })

  const dispatch = useDispatch()
  const location = useLocation()

  const { postArray, isEmptyArray, arraySize, isPostsChanged,
    likes, userSaved, saveBit, likeBit, loading } = useSelector((store) => {
      return store.firestoreDB
    })

  const { isAuth, currentUser } = useSelector((store) => {
    return store.user
  })




  useEffect(() => {
    console.count("home useEffect ")
    let isCancelled = false

    if (location.pathname === '/profile') {
      setPostLists(props.postLists)
      setStyles({
        home: 'dark:bg-gray-700  p-0 m-0',
        PostsContainers: 'm-0 p-0 '
      })
      console.log(postLists)

    } else {
      dispatch(getPost())
      dispatch(getLiked())

      !isEmptyArray && !isCancelled
      setPostLists((prev) =>
        postArray?.map((doc) => {
          return { ...doc.data(), postId: doc.id }
        })
      )
    }

    return () => {
      isCancelled = true
    }

  }, [arraySize, saveBit, isPostsChanged, props.isProfilePost])


  const handleCommentBox = (id) => {
    setOpenCommentBox(!OpenCommentBox)
    setCommentPostId(id)
  }

  return (


    <section className={styles.home} >
      {
        !postLists && <HomePageLoad />
      }

      <div className={styles.PostsContainers}>
        {
          postLists &&
          postLists.map((post) => {

            return <div id="postContainer" key={post.postId}>

              <div id="postHeader" className=''>
                <div className='flex justify-end'>

                  {
                    isAuth && post.author.id === currentUser.user.uid &&
                    <Delete
                      isAuth={isAuth}
                      postId={post.postId}
                      commentRef={post.commentRef}
                      likesRef={post.likesRef}
                    />
                  }

                  <Save
                    isAuth={isAuth}
                    postId={post.postId}
                    userSaved={userSaved}
                  />

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
                <Like
                  isAuth={isAuth}
                  postId={post.postId}
                  user={currentUser?.user}
                  loading={loading}
                  likeBit={likeBit}
                  likesRef={post.likesRef}
                  userLiked={post.liked}
                  likes={likes}
                  likeCount={post.likeCount} />

                <button onClick={() => handleCommentBox(post.postId)}
                  className='ml-3'>
                  <CommentBtn />
                </button>
                <Share />
              </div>

              {
                OpenCommentBox && commentPostId === post.postId &&
                <CommentBox
                  isAuth={isAuth}
                  postId={commentPostId}
                  user={currentUser?.user}
                  isPostsChanged={isPostsChanged}
                  commentRef={post.commentRef}
                />
              }

            </div>
          })
        }
      </div>
    </section>
  )
}

// * like 
export const Like = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLiked, setisLiked] = useState(false)
  const [LikeCount, setLikeCount] = useState(props.likeCount)
  const { likes } = useSelector(store => store.likeReducer)

  useEffect(() => {
    console.log("likes")
    console.log(likes)
    props.isAuth && likes
    setisLiked(Boolean(
      likes[props.postId]?.find((uid) => {
        return uid === props.user?.uid
      })
    ))

  }, [])

  const handleLiked = (id) => {

    if (props.isAuth) {
      if (isLiked) {
        dispatch(removeLiked({ id, likeId: props.likesRef }))
        setLikeCount(prev => prev - 1)
      } else {
        dispatch(likePost({ id, likeId: props.likesRef }))
        setLikeCount(prev => prev + 1)
      }
      console.log(isLiked)
      setisLiked(!isLiked)

    } else
      navigate('/login')
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
export const Save = (props) => {
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

export const Delete = (props) => {
  const dispatch = useDispatch()

  const handldeDeletePost = () => {
    const data = {
      id: props.postId,
      commentRef: props.commentRef,
      likesRef: props.likesRef
    }
    dispatch(deletePost(data))
    dispatch(getPost)
    console.log("post deleted")
  }

  return <button onClick={handldeDeletePost}
    className='mr-3'>
    <IoTrashBinOutline id="topRowIcons" />
  </button>
}

// * comment 
export const CommentBtn = () => <FaRegComment size='22' id='bottomIcons' />

// * share
export const Share = () => {
  const handelShare = () => {
    console.log("shared")
  }
  return <button onClick={handelShare} className='pl-3 '>
    <RiShareForwardLine size='24' id='bottomIcons' />
  </button>
}



export default Home