import React, { useState, useEffect } from 'react'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import spaceImg from '../assets/space.png'
import { addData } from '../features/firebase/crudSlice'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')

  const navigate = useNavigate()

  const { isAuth } = useSelector((store) => {
    return store.login
  })
  const dispatch = useDispatch()

  const createPost = () => {
    dispatch(addData(
      {
        docName: "posts",
        doc: {
          title,
          postText,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid
          }
        }
      }
    ))
    navigate("/") 
  }


  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [])


  return (
    <section className='sm:mt-24 xs:mt-10'>
      <div className='createPost'
        style={{ background: `url(${spaceImg})` }}>
        <h1 className='CreatePostFeildText text-4xl mb-6' >Create A Post</h1>
        <div className='pt-4 pl-10 pr-10'>
          <label className='CreatePostFeildText '>Title</label><br />
          <input className='createPostInput' placeholder='Title'
            onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div className='p-1 pl-10 pr-10'>
          <label className='CreatePostFeildText mt-4'>Post</label><br />
          <textarea className='createPostInput h-44' placeholder='post'
            onChange={(e) => { setPostText(e.target.value) }} />

        </div>
        <div className='flex justify-center p-4'>
          <button className='btn p-3 pl-4 pr-4'
            onClick={createPost}>Submit Post</button>
        </div>
      </div>
    </section>
  )
}

export default CreatePost