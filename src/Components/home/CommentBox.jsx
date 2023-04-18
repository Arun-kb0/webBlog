import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commentPost, getComments, deleteComment } from '../../features/redux/firebase/comment/commentActions'
import { doc } from 'firebase/firestore'

// import { IoTrashBinOutline } from 'react-icons/io5'
import{IoTrashBinOutline} from '../../imports/reactIcons'

const CommentBox = (props) => {

  return (
    <div className='commentBox-container'>

      <CommentList
        commentRef={props.commentRef}
        uid={props.user?.uid}
      />

      <CommentInput
        postId={props.postId}
        user={props.user}
        commentRef={props.commentRef}
        isAuth={props.isAuth}
      />

    </div>
  )
}


const CommentList = (props) => {
  console.log("comment list")
  const dispatch = useDispatch()
  // const { comments, commentEnterd } = useSelector((state) => state.firestoreDB)
  const { comments, commentEnterd } = useSelector((state) => state.commentReducer)

  useEffect(() => {
    console.warn(comments)
    dispatch(getComments(props.commentRef))
    console.warn(comments)
  }, [commentEnterd, props.commentRef])

  const handleDelete = (comment) => {
    dispatch(deleteComment(
      {
        comment,
        id: props.commentRef
      }))
  }

  return (
    <ul className='comment-list '>
      {
        comments?.map((comment, index) => (
          <li key={index} className={props.uid === comment.uid ?
            'comment ml-20' : 'comment'}>

            <div className='flex flex-col w-11/12'>
              <span >
                {comment.commentText}
              </span>
              <span className='commented-user'>@{comment.username}</span>
            </div>

            {comment.uid === props.uid &&
              <div className='delete-comment-btn'>

                <i onClick={() => handleDelete(comment)}
                  className=''
                ><IoTrashBinOutline size='20' />
                </i>
              </div>
            }

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

    const timestamp = new Date().getTime();
    !props.isAuth && navigate("/login")
    console.log(props.postId)

    const data = {
      commentRefId: props.commentRef,
      commentData: {
        postId: props.postId,
        uid: props.user.uid,
        commentText: comment,
        username: props.user.displayName,
        timeStamp: timestamp
      }
    }
    dispatch(commentPost(data))
    setComment("")

  }

  return <div className='commentInput-container '>
    <textarea
      className='comment-input '
      placeholder='write a comment'
      type='text'
      value={comment}
      onChange={handleText}>
    </textarea>
    <button className='btn comment-btn'
      onClick={hanldeCommentInput}>post comment</button>
  </div>
}



export default CommentBox