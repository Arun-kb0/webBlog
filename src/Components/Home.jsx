import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdOutlineFavorite } from 'react-icons/md'

import { useSelector } from 'react-redux'


function Home() {
  const [postLists, setPostLists] = useState([])
  const postCollectionRef = collection(db, "posts")

  const { isAuth } = useSelector((state) => {
    return state.login
  })

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
    console.log(postLists[0])
  }, [postLists.length])

  // delete post
  const deletePost = async (id) => {
    console.log(id)
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)

    postLists.filter((post) => {
      post.postId != id
    })
  }



  return (

    <section className='block justify-center items-center mt-10' >

      {
        postLists &&
        postLists.map((post) => {

          return <div id="postContainer" className=' lg:ml-60 lg:mr-60 m-20 rounded-lg shadow-xl p-5 relative z-10 '>

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
                  <button >

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
              <div>
                <button>
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