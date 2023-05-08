
import React from 'react'
import FollowUsers from '../Components/followUsers/FollowUsers'
import { useSelector } from 'react-redux'

const AddUsersPage = () => {
    const { usersList, usersListSize, following } = useSelector((state) => state.followReducer)
    const { userDoc, isAuth } = useSelector(state => state.user)

    return (
        <div>
            <FollowUsers
                usersList={usersList}
                usersListSize={usersListSize}
                following={following}
                userDoc={userDoc}
                isAuth={isAuth}
            />
        </div>
    )
}

export default AddUsersPage