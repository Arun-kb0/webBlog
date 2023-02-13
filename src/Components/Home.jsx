import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase-config'
import { IoTrashBinOutline } from 'react-icons/io5'
import { BsBookmarkPlus } from 'react-icons/bs'
import { MdNoAccounts, MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdOutlineFavorite } from 'react-icons/md'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import { setSavedPosts, setLikedPosts, deleteData, getUserIntractions } from '../features/firebase/crudSlice'
// import { collection, getDocs } from 'firebase/firestore'

import { getPost, savePost, likePost, deletePost } from '../features/redux/firebase/fireStore/firestoreActions'

function Home() {
  const [postLists, setPostLists] = useState([])
  const [isDone, setIsDone] = useState(false)
  // const [saved, setSaved] = useState([])
  // const [liked, setLiked] = useState([])

  // const { isAuth } = useSelector((state) => {
  //   return state.login
  // })
  // const { likedPosts, savedPosts } = useSelector((state) => {
  //   return state.crud
  // })

  const dispatch = useDispatch()
  const { postArray, isEmptyArray, arraySize, isPostsChanged } = useSelector((store) => {
    return store.firestoreDB
  })

  const { isAuth } = useSelector((store) => {
    return store.user
  })



  const timeStamp = Date.now()
  const navigate = useNavigate()

  // ! need to fix reloading
  useEffect(() => {
    dispatch(getPost())
    console.log(postArray)
    console.log(isEmptyArray)
    console.log(arraySize)

    isEmptyArray == false && setPostLists(
      postArray.map((doc) => {
        // console.log(doc.data())
        return { ...doc.data(), postId: doc.id }
      })
    )
    //  ! below code needed

    //   if (auth.currentUser) {
    //     const { likedPosts, savedPosts } = dispatch(
    //       getUserIntractions(auth.currentUser.uid)
    //     )

    //     setLiked(likedPosts)
    //     setSaved(savedPosts)
    //     console.log(likedPosts)

    //     console.log(saved)

    //   }

    //   const getPost = async () => {
    //     const postCollectionRef = collection(db, "posts")
    //     const data = await getDocs(postCollectionRef)
    //     setPostLists(
    //       data.docs.map((doc) => {
    //         return { ...doc.data(), postId: doc.id }
    //       })
    //     )
    //   }
    //   getPost()
    //   console.log("postLists")
    //   console.log(postLists)
  }, []) 


  const handldeDeletePost = (id) => {
    dispatch(deletePost(id))

    postLists.filter((post) => {
      post.postId != id
    })
    if (isDone) setIsDone(false)
    else setIsDone(true)
  }


  const handleSavePost = (id) => {
    console.log(id)
    console.log(auth.currentUser.uid)

    isAuth ? dispatch(savePost(id)) : navigate('/login')
  }

  const handleLiked = (id) => {

    isAuth ? dispatch(likePost(id)) : navigate('/login')
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
                      handldeDeletePost(post.postId)
                    }}>
                      <IoTrashBinOutline id="topRowIcons" />
                    </button>
                  }
                </div>
                <div className=''>
                  {/*  * save btn */}
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
                <button className=''
                  onClick={() => { handleLiked(post.postId) }}>
                  <MdOutlineFavoriteBorder id="bottomIcons"
                    className='focus:bg-red-600' />
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