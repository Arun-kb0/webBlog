import React, { useEffect } from 'react'
import space from '../assets/space.png'
import solo from '../assets/solo.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiFillCamera, AiOutlinePlus, AiFillEdit } from 'react-icons/ai'

function Profile() {
    const { auth, currentUser } = useSelector((store) => store.user)
    console.log('profile')

    return (
        <section className='profile-container '>
            <div className='profile-header'>
                <CoverPic />
                <ProfilePic />
            </div>
            <UserButtons currentUser={currentUser} />
            <UserDetails currentUser={currentUser} />
            <UserPosts />
        </section>
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

const ProfilePic = () => (
    <div className='profile-pic-container '>
        <img className='profile-pic '
            src={solo} alt='profile picture' />
        <i className='camera-icon profile-pic-cam-position'>
            <AiFillCamera size='28' />
        </i>
    </div>
)

// * profile buttons 
const UserButtons = (props) => {
    return (
        <div className='profile-butons '>
            <p className='mb-2'><span className='profile-username'> {props.currentUser?.user.displayName}</span></p>
            <div className='flex'>
                <button className='btn dark:light-btn profile-btn'>
                    <i className=' pr-3'><AiOutlinePlus size='22' /></i>Add story
                </button>
                <button className='btn dark:light-btn profile-btn '>
                    <i className='pr-3'><AiFillEdit size='20' /></i>
                    Edit profile</button>
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


const UserPosts = () => (
    <div className='profile-userPosts'>

    </div>
)

export default Profile