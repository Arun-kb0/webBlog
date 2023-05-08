import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, getUserFollowList } from '../../features/redux/firebase/follow/followActions'
import UserCard from './UserCard'

import { useNavigate } from 'react-router-dom'

function FollowUsers(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {usersList, usersListSize, following ,userDoc, isAuth} = props

    const styles = {
        userCardContainer: "user-card-container",
        userCard: "user-card",
        userCardProfileContainer: "user-card-profile-container",
        profilePic: "userCard-profilePic ",
        userCardElements: "user-card-elements",
        userCardUserName: "user-card-username mx-3",
    }

    useEffect(() => {
        !isAuth && navigate('/login')
        dispatch(getUsers(userDoc))
        isAuth && !following &&
            dispatch(getUserFollowList(userDoc?.followRef))

        console.warn(usersList)
        console.warn(following)
    }, [usersListSize])

    return (
        <div className="follow-container">
            <div className="follow-userlist  mt-28">
                {
                    usersList &&
                    usersList.map((user) => (
                        <UserCard
                            username={user.name}
                            uid={user.userId}
                            photoURL={user?.photoURL}
                            followColId={userDoc.followRef}
                            currentUserId={userDoc.userId}
                            currentUserName={userDoc.name}
                            styles={styles}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FollowUsers