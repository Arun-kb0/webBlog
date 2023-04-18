import React, { useEffect, useState, lazy, Suspense } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  getPost, savePost, deletePost, removeSaved,
} from '../../features/redux/firebase/fireStore/firestoreActions'

import { likePost, getLiked, removeLiked } from '../../features/redux/firebase/like/likeActions'
import { removeShared, sharePost } from '../../features/redux/firebase/share/shareActions'
import { getHashtagPosts } from '../../features/redux/firebase/hashtag/hashtagActions'

import CommentBox from './CommentBox'
import HomePageLoad from './HomePageLoad'


import {
  BsBookmarkPlus, BsBookmarkCheckFill,
  FaRegComment,
  RiShareForwardLine,
  AiOutlineHeart,
  AiFillHeart,
  IoTrashBinOutline
} from '../../imports/reactIcons'
import { followUser } from '../../features/redux/firebase/follow/followActions'


function Home(props) {
  const [postLists, setPostLists] = useState([])
  const [OpenCommentBox, setOpenCommentBox] = useState(false)
  const [commentPostId, setCommentPostId] = useState(null)
  const [styles, setStyles] = useState({
    home: 'home',
    PostsContainers: 'PostsContainers'
  })


  const { isPostsChanged, likes, userSaved, likeBit,
    loading } = useSelector((store) => {
      return store.firestoreDB
    })

  const { isAuth, currentUser,userDoc } = useSelector((store) => {
    return store.user
  })


  useEffect(() => {
    console.count("home useEffect ")
    let isCancelled = false

    !isCancelled && setPostLists(props?.postLists)

    return () => {
      isCancelled = true
    }

  }, [props.postChangeBit, props.tagPostChange,
  props.isProfilePost, props.searchChange])


  const handleCommentBox = (id) => {
    setOpenCommentBox(!OpenCommentBox)
    setCommentPostId(id)
  }

  return (

    <section className={props.styles.home} >
      <Suspense fallback={<div>loading.......</div>}>
        {
          !postLists && <HomePageLoad />
        }

        <div className={props.styles.PostsContainers}>
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
                        shareRef={post.shareRef}
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
                <Hashtags
                  hashtags={post.hashtags}
                />
                <h3 className='mt-1 text-zinc-400'>@{post.author.name}</h3>


                <div className='bottom-btns-container mt-3 flex flex-row'>
                  <Like
                    isAuth={isAuth}
                    postId={post.postId}
                    user={currentUser?.user}
                    loading={loading}
                    likeBit={likeBit}
                    likesRef={post.likesRef}
                    likes={likes}
                    likeCount={post?.likeCount}
                     />

                  <button onClick={() => handleCommentBox(post.postId)}
                    className='ml-3'>
                    <CommentBtn />
                  </button>
                  <Share
                    postId={post.postId}
                    isAuth={isAuth}
                    user={currentUser?.user}
                    userDoc={userDoc}
                  />
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

      </Suspense>
    </section>
  )
}

// * handle hashtags  
const Hashtags = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleHashtags = (tag) => {
    dispatch(getHashtagPosts(tag))
    navigate('/hashtags')

  }

  return <div className='hashtags'>
    {props.hashtags?.map((tag, index) => (
      <span
        onClick={() => handleHashtags(tag)}
        key={index} >#{tag}
      </span>
    ))}
  </div>
}



// * like 
export const Like = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLiked, setisLiked] = useState(false)
  const [LikeCount, setLikeCount] = useState(props?.likeCount)
  const { likes } = useSelector(store => store.likeReducer)

  useEffect(() => {
    console.log("likes")
    // console.log(likes)
    props.isAuth && likes &&
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
    <span className='pr-1'>{LikeCount ? LikeCount : ""}</span>
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
      likesRef: props.likesRef,
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
export const Share = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handelShare = () => {
   

    if (props.isAuth) {
      console.log("shared")
      console.warn(props.user)

      const data = {
        uid: props.user.uid,
        postId: props.postId
      }
      dispatch(sharePost({data,userDoc:props.userDoc}))

      dispatch(followUser({data,userDoc: props.userDoc}))
      // dispatch(removeShared(data))
    } else {
      navigate('/login')
    }
  }
  return <button onClick={handelShare} className='pl-3 '>
    <RiShareForwardLine size='24' id='bottomIcons' />
  </button>
}



export default Home