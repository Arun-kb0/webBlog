import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { FcEmptyTrash } from 'react-icons/fc'
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
  }, [])

  // delete post
  const deletePost = async (id) => {
    console.log(id)
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)

    postLists.filter((post) => {
      post.postId != id
    })
  }


  console.log("postLists")
  console.log(postLists)


  return (
    <section className='block justify-center items-center mt-10'>

      {
        postLists &&
        postLists.map((post) => {

          return <div id="postContainer" className=' lg:ml-60 lg:mr-60 m-20 rounded-lg shadow-xl p-5 '>
            <div id="postHeader" className='text-xl uppercase text-center text-red-700 font-semibold mb-4 '>
              <div className='text-end'>
                {
                  isAuth && post.author.id === auth.currentUser.uid &&

                  <button onClick={() => {
                    // console.log(auth.currentUser.uid)
                    // console.log(post.author.id)
                    deletePost(post.postId)
                  }}>
                    <FcEmptyTrash />
                  </button>
                }
              </div>
              <div>
                <h1>{post.title}</h1>
              </div>
            </div>
            <div id="postTextContainer" className='text-zinc-700'>
              {post.postText}
            </div>
            {/* <h3>@{post.author}</h3> */}
          </div>
        })
      }
    </section>
  )
}

export default Home