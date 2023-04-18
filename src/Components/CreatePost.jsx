import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import wave2 from '../assets/wave2.png'

import { addPost } from '../features/redux/firebase/fireStore/firestoreActions'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const [hashtags, setHashtags] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuth, currentUser } = useSelector((store) => {
    return store.user
  })

  const createPost = () => {
    console.log("currentUser")

    let hashtagsArray = hashtags.split("#")
    hashtagsArray = hashtagsArray.filter(item => item != "")

    const data = {
      docName: "posts",
      doc: {
        title,
        postText,
        hashtags: hashtagsArray,
        author: {
          name: currentUser.user.displayName,
          id: currentUser.user.uid,
          timeStamp: new Date().toUTCString()
        },
        commentRef: null,
        likesRef: null,

      }
    }
    dispatch(addPost(data))
    navigate("/")
  }


  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [])


  return (
    <section className='createPostContainer'>
      <div className='createPost'>

        <div className='create-post-header'>
          <img className='create-post-wave'
            src={wave2} alt='' />
          <h1 className='create-post-title' >Create Post</h1>
        </div>

        <div className='create-post-inputs'>
          <label className='CreatePostFieldText '>Title</label><br />
          <input className='createPostInput' placeholder='Title'
            onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div className='p-1 pl-10 pr-10 h-1/2'>
          <label className='CreatePostFieldText mt-2'>Post</label><br />
          <textarea className='createPostInput h-36' placeholder='post'
            onChange={(e) => { setPostText(e.target.value) }} />

        </div>

        <div className='create-post-inputs'>
          <input className='createPostInput' placeholder='Hashtags'
            onChange={(e) => setHashtags(e.target.value)} />
        </div>

        <div className='flex justify-center p-2 pb-3'>
          <button className='dark:btn light-btn'
            onClick={createPost}>Submit Post</button>
        </div>
      </div>
    </section>
  )
}

export default CreatePost