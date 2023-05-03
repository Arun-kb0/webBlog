import React, { useEffect, useState } from 'react'
import Home from '../home/Home'
import space from '../../assets/space.png'
import solo from '../../assets/solo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    AiFillCamera, AiOutlinePlus, AiFillEdit,
    HiMenuAlt1, IoClose,
    BsBookmarkCheckFill, RiShareForwardLine
} from '../../imports/reactIcons'
import Following from './Following'
import Followers from './Followers'
import SavedPosts from './SavedPosts'

import {uploadProfilePic} from '../../features/redux/firebase/auth/authAction'

function Profile() {
    const { isAuth, currentUser } = useSelector((store) => store.user)
    const { postArray, isEmptyArray, arraySize, } = useSelector((store) => store.firestoreDB)
    const { following, followingSize } = useSelector(state => state.followReducer)

    const [postLists, setPostLists] = useState([])
    const [userPostBit, setUserPostBit] = useState(false)
    const [viewComponents, setViewComponents] = useState({
        componentName: null
    })
    const [hamOpen, setHamOpen] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        console.log("profile useEffect")
        let isCancelled = false
        if (!isAuth) navigate('/login')


        //*  !isCancelled && 
        setPostLists(
            postArray?.map((doc) => {
                // console.log(doc.data())
                return { ...doc.data(), postId: doc.id }
            })
        )

        setPostLists((prev) =>
            prev.filter((post) => {
                return post.author.id === currentUser.user.uid
            }))
        console.log("filterd postLists")
        console.log(postLists)
        console.log(userPostBit)

        // return(()=>{ 
        //     isCancelled=true
        // }) 

    }, [userPostBit, followingSize])


    const hanldeUserPosts = () => {
        setUserPostBit(!userPostBit)
    }

    const handleViewFollowers = ({ componentName }) => {
        console.log(componentName)
        setViewComponents((prev) => ({
            componentName: prev.componentName === componentName ? null : componentName,
        }))

        console.log(viewComponents)
    }

    return (
        <section className='profile-container '>


            {isAuth &&
                <div onLoad={hanldeUserPosts}>

                    {
                        !viewComponents.componentName &&

                        <div>
                            <div onClick={() => setHamOpen(!hamOpen)}
                                className='flex justify-end mr-10'
                            >
                                <ProfileHamMenuIcon
                                    hamOpen={hamOpen}
                                />

                                {hamOpen &&
                                    <ProfileHamMenu
                                        view={handleViewFollowers}
                                    />
                                }
                            </div>

                            <div className='profile-header'>
                                <CoverPic />
                                <ProfilePic
                                    photo={solo}
                                />
                            </div>
                        </div>
                    }
                    <UserButtons
                        currentUser={currentUser}
                        view={handleViewFollowers}
                    />

                    {
                        viewComponents.componentName === 'following' &&
                        <Following />
                    }

                    {
                        viewComponents.componentName === 'followers' &&
                        <Followers />
                    }

                    {/* ! add components */}
                    {
                        viewComponents.componentName === 'shared' &&
                        <UserPosts />

                    }
                    {
                        viewComponents.componentName === 'saved' &&
                        <SavedPosts />

                    }



                    {
                        !viewComponents.componentName &&

                        <div>
                            <UserDetails currentUser={currentUser} />
                            <UserPosts
                                postLists={postLists}
                                userPostBit={userPostBit}
                            />
                        </div>
                    }
                </div>
            }
        </section>
    )
}


// * profile ham menu btn
const ProfileHamMenuIcon = (props) => {
    return (
        <div className='z-20 fixed mt-36 rounded-full p-2 bg-green-500'>
            {props.hamOpen
                ? <HiMenuAlt1 size='22' />
                : <IoClose size='22' />
            }
        </div>
    )
}

// * profile ham menu 
const ProfileHamMenu = ({ view }) => {
    const showContents = (componentName) => {
        view({ componentName })
    }

    return (
        <div className='fixed mt-48 z-20  '>

            <ul className='w-28 '>

                <li className='rounded-full bg-gray-300 px-2 py-1 shadow-xl font-bold flex'
                    onClick={() => showContents('shared')}
                >
                    <span className='ml-2'>shared</span>
                    <RiShareForwardLine className='ml-3 my-1' />
                </li>

                <li className='rounded-full bg-gray-300 px-2 py-1 shadow-xl font-bold flex justify-start my-2 '
                    onClick={() => showContents('saved')}

                >
                    <span className='ml-2'>saved</span>
                    <BsBookmarkCheckFill className='ml-3 my-1' />
                </li>

            </ul>
        </div>
    )
}

// * header components
const CoverPic = () => (
    <div className='cover-pic-container'>
        <img className='cover-pic'
            src={space} alt="cover picture" />
        <i className='camera-icon cover-cam-position '>
            <AiFillCamera size='28' />
        </i>
    </div>
)

export const ProfilePic = (props) => {
    const dispatch = useDispatch()
    const {userDoc} = useSelector(state=> state.user)

    const handleFile = (e) => {
        const file = e.target.files[0]
        console.log(file)
        dispatch(uploadProfilePic(file))
    }

    // ! instant change requierd
    useEffect(()=>{

    },[userDoc])

    return (
        <div className='profile-pic-container '>
            <img className='profile-pic '
                src={userDoc.photoURL? userDoc.photoURL: solo } alt='profile picture' />

            <input
                onChange={handleFile}
                type='file' id='file'
                className='hidden'
            />
            <label htmlFor='file' className='camera-icon profile-pic-cam-position '>
                <AiFillCamera size='28' />
            </label>

        </div>
    )
}

// * profile buttons 
const UserButtons = (props) => {

    const showContents = (componentName) => {
        props.view({ componentName })
    }

    return (
        <div className='profile-butons '>
            <p className='mb-2'><span className='profile-username'> {props.currentUser?.user.displayName}</span></p>
            <div className='flex'>
                <button
                    className='btn  profile-btn'
                    onClick={() => showContents('followers')}

                >
                    <i className=' pr-3'><AiOutlinePlus size='22' /></i>
                    Followers
                </button>
                <button
                    className='btn profile-btn '
                    onClick={() => showContents('following')}
                >
                    <i className='pr-3'><AiFillEdit size='20' /></i>
                    Following
                </button>
                <button
                    className='btn  profile-btn'
                    onClick={() => showContents('following')}
                >
                    <i className=' pr-3'><AiOutlinePlus size='22' /></i>
                    Add story
                </button>
                <button
                    className='btn profile-btn '
                    onClick={() => showContents('following')}
                >
                    <i className='pr-3'><AiFillEdit size='20' /></i>
                    Edit profile
                </button>

            </div>
        </div>
    )
}

// * userDetails compomemts
const UserDetails = (props) => (
    <div className='user-details-container'>
        <div className='profile-user-details'>
            <p>Email : <span>{props.currentUser?.user.email}</span></p>
            <p>flowers : <span>{props.currentUser?.user.email}</span></p>
            <p>following : <span>{props.currentUser?.user.email}</span></p>
        </div>
    </div>
)


const UserPosts = (props) => {
    const styles = {
        home: '',
        PostsContainers: ''
    }
    return (
        <div className='profile-userPosts'>
            <Home
                postLists={props.postLists}
                isProfilePost={props.userPostBit}
                styles={styles}
            />
        </div>
    )
}


export default Profile