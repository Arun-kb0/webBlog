import React, { useState,useEffect } from 'react'
import { IoCalendarNumber, IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commentPost } from '../features/redux/firebase/fireStore/firestoreActions'


const CommentBox = (props) => {

  return (
    <div className='commentBox-container'>

      <CommentList comments={props.comments}
       isPostsChanged={props.isPostsChanged} uid={props.user?.uid}/>

      <CommentInput postId={props.postId} user={props.user}
        isAuth = {props.isAuth} isPostsChanged={props.isPostsChanged} />


    </div>
  )
}


const CommentList = (props) => {

  const [comments, setComments] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    setComments((prev)=>props.comments)
  },[props.isPostsChanged])

  return (
    <ul className='comment-list '>
      {
        props.comments?.map((comment, index) => (
          <li key={index} className={ props.uid===comment.uid ? 
            'comment ml-20' : 'comment' }>
            <span>
              {comment.commentText}
            </span>
            <span className='commented-user'>@{comment.username}</span>
          </li>
        ))
      }
    </ul>
  )
}

const CommentInput = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState(null)
  
  const handleText = (e) => {
    setComment(e.target.value)
  }

  const hanldeCommentInput = () => {

    console.log("comment input")
    !props.isAuth && navigate("/login")
    console.log(props.postId)
    const data = {
      postId: props.postId,
      comment: {
        commentText: comment,
        username: props.user.displayName,
        uid:props.user.uid
      }
    }
    dispatch(commentPost(data))

  
  }

  return <div className='commentInput-container '>
    <textarea placeholder='write a comment' type='text'
      className='comment-input'
      onChange={handleText}>

    </textarea>
    <button className='btn comment-btn'
      onClick={hanldeCommentInput}>post comment</button>
  </div>
}



export default CommentBox