import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdOutlineFavorite } from 'react-icons/md'

import { useSelector, useDispatch } from 'react-redux'
import { setSavedPosts, setLikedPosts ,deleteData } from '../features/firebase/crudSlice'
import { set } from 'react-hook-form'

function Home() {
  const [postLists, setPostLists] = useState([])
  const [isDone, setIsDone] = useState(false)
  const [saved, setSaved] = useState([])

  const { isAuth } = useSelector((state) => {
    return state.login
  })
  const dispatch = useDispatch()

  const postCollectionRef = collection(db, "posts")
  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef)
      setPostLists(
        data.docs.map((doc) => {
          return { ...doc.data(), postId: doc.id }
        })
      )
    }
    getPost()
    console.log("postLists")
    console.log(postLists)
  }, [isDone])

  const deletePost = (id) => {
    dispatch(
      deleteData({
        docName: "posts",
        docId: id,
      }
      ))
    postLists.filter((post) => {
      post.postId != id
    })
    if (isDone) setIsDone(false)
    else setIsDone(true)
  }

  const handleSavePost = (id) => {
    console.log(id)
    console.log(auth.currentUser.uid)
    setSaved(id)
    
    dispatch(setSavedPosts(
      {
        docName:"userActions",
        userData:{
          userId:auth.currentUser.uid,
          likedPosts:[null],
          savedPosts:[id]
      }
    }
    ))
  }

  const handleLiked = (id)=>{
    dispatch(setLikedPosts(
      {
        docName:"userActions",
        userData:{
          userId:auth.currentUser.uid,
          likedPosts:[id],
          savedPosts:[null]
        }
      }
      ))
  }

  return (

    <section className='block justify-center items-center mt-10' >
      {
        postLists &&
        postLists.map((post, index) => {

          return <div id="postContainer" className='lg:ml-60 lg:mr-60 m-20 rounded-lg shadow-xl p-5 relative z-10 '>

            <div id="postHeader" className='text-xl uppercase text-center font-semibold mb-4 '>
              <div className='flex justify-end'>
                <div className='mr-5'>
                  {
                    isAuth && post.author.id === auth.currentUser.uid &&
                    <button onClick={() => {
                      deletePost(post.postId)
                    }}>
                      <IoTrashBinOutline id="topRowIcons" />
                    </button>
                  }
                </div>
                <div className=''>
                  <button onClick={() => { handleSavePost(post.postId) }}>
                    <BsBookmarkPlus id="topRowIcons" />
                  </button>
                </div>
              </div>

              <div>
                <h1 className='postTitle'>{post.title}</h1>
              </div>
            </div>
            <div id="postTextContainer" className='text-zinc-500 '>
              {post.postText}
            </div>
            <h3 className='mt-5 text-zinc-400'>@{post.author.name}</h3>

            <div className='mt-2'>
              {/* like btn */}
              <div>
                <button onClick={()=>{handleLiked(post.postId)}}>
                  <MdOutlineFavoriteBorder id="bottomIcons" />
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