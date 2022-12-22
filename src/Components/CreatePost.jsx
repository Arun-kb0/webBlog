import React, { useState,useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')

  const navigate = useNavigate()
  
  const {isAuth} = useSelector((store)=>{
    return store.login
  })

  // firebase addDoc
  const postCollectionRef = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title: title,
      postText: postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
    navigate('/')
  }

  useEffect(() => {
    if(!isAuth) navigate('/login')
  }, [])
  

  return (
    <section className=''>
      <div className='createPost'>
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