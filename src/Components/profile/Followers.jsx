import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFollowersList} from '../../features/redux/firebase/follow/followActions'
import UserCard from '../followUsers/UserCard'
function Followers() {
  const dispatch = useDispatch()
    const {userDoc , isAuth} = useSelector(state => state.user)
    const {followers} = useSelector(state=> state.followReducer)


    const styles = {
      userCardContainer: "user-card-container",
      userCard: "user-card",
      userCardProfileContainer: "user-card-profile-container",
      profilePic: "profile-pic",
      userCardElements: "user-card-elements",
      userCardUserName: "user-card-username mx-3",
  }
    
    useEffect(()=>{
        dispatch(getFollowersList({
            uid:userDoc.userId,
            username:userDoc.name,
            followDocId :userDoc.followRef
        }))
    },[])


  return (
    <div className='following-container follow-container-profile'>
    <div className='following-users '>

      {
        followers?.map((user) => (

          <UserCard 
            key={user?.uid}
            username={user?.username}
            uid={user?.uid}
            followColId={userDoc.followRef}
            styles={styles}
          />
        ))
      }

    </div>
  </div>
  )
}

export default Followers