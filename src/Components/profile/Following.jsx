import React, { useEffect, useState } from 'react'
import UserCard from '../followUsers/UserCard'
import { getUserFollowList } from '../../features/redux/firebase/follow/followActions'
import { useDispatch, useSelector } from 'react-redux'

function Following() {

  const { userDoc, isAuth } = useSelector(state => state.user)
  const { following, followingSize, followArrayChange } = useSelector(state => state.followReducer)
  const dispatch = useDispatch()
  const [followList, setFollowList] = useState(following && following)

  const styles = {
    userCardContainer: "user-card-container",
    userCard: "user-card",
    userCardProfileContainer: "user-card-profile-container",
    profilePic: "profile-pic",
    userCardElements: "user-card-elements",
    userCardUserName: "user-card-username mx-3",
  }


  useEffect(() => {
    let isCancelled = false

    dispatch(getUserFollowList({
      followColId: userDoc.followRef
    }))
    if (!isCancelled) {
      setFollowList((prev) => following)
      console.warn(followList)
    }

    return () => {
      isCancelled = true
    }
  }, [followingSize, isAuth,followArrayChange])


  return (
    <div className='following-container follow-container-profile'>
      <div className='following-users '>

        {
          followList?.map((user) => (

            <UserCard 
              key={user?.uid}
              username={user?.username}
              uid={user?.uid}
              followColId={userDoc.followRef}
              currentUserId={userDoc.userId}
              styles={styles}
            />
          ))
        }

      </div>
    </div>
  )
}

export default Following