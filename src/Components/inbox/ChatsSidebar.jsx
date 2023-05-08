import React, { useEffect, useState } from 'react'
import { Divider } from '../SideBar'
import UserCard from '../followUsers/UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getUserFollowList } from '../../features/redux/firebase/follow/followActions'
import { addChat, getUserChat, searchUser } from '../../features/redux/firebase/chat/chatActions'
import UserSearch from './UserSearch'



function ChatsSidebar() {

  const { following, followingSize } = useSelector(state => state.followReducer)
  const { userDoc } = useSelector(state => state.user)
  const { userChats, foundUsers, userChatsSize } = useSelector(state => state.chatReducer)
  const dispatch = useDispatch()

  const [searchRes, setsearchRes] = useState(foundUsers)

  const styles = {
    userCardContainer: "user-card-container my-2",
    userCard: "user-card w-4/12",
    userCardProfileContainer: "user-card-profile-container w-16 ",
    profilePic: "userCard-profilePic w-16 h-14",
    userCardElements: "user-card-elements w-7/12",
    userCardUserName: "user-card-username ",
    btn: "hidden"
  }

  const searchStyles = {
    search: "w-full my-4"
  }

  // useEffect(() => {
  //   dispatch(getUserFollowList({ followColId: userDoc?.followRef }))
  //   dispatch(getUserChat())

  // }, [userChatsSize])


  useEffect(() => {
    console.warn("chatSidebar")
    dispatch(getUserChat())
  }, [foundUsers,userChatsSize])



  const handleUser = (user) => {
     dispatch(addChat(user)).then(()=>{
       dispatch(searchUser(''))
       dispatch(getUserChat())
     })

  }


  return (
    <div className='ChatsSidebarContainer'>
      <div className='ChatsSidebar '>
        <UserSearch />
        <div className='mt-4'>
          {foundUsers &&
            foundUsers?.map((user) => (
              user &&
              <i key={user?.userId}
                onClick={() => handleUser({
                  uid: user.userId,
                  username: user.name,
                  photoURL: user.photoURL ? user.photoURL : null
                })}
                className='cursor-pointer'
              >
                <UserCard
                  key={user?.userId}
                  username={user?.name}
                  photoURL={user?.photoURL}
                  uid={user?.userId}
                  styles={styles}
                />
              </i>
            ))
          }
        </div>

        <Divider />

        <div className='mt-4'>
          {/* {
          following?.map((user) => (
            <i key={user?.uid}
              onClick={()=>handleUser({uid:user.uid , username:user.name , photoURL:user.photoURL})}
              className='cursor-pointer'
            >
              <UserCard
                key={user?.uid}
                username={user?.username}
                photoURL={user?.photoURL}
                lastMessage={user.lastMessage}
                uid={user?.uid}
                styles={styles}
              />
            </i>
          ))
        } */}



          {userChats &&
            Object.values(userChats).map((user) => (
              <i key={user?.userInfo.uid}
                onClick={() => handleUser({
                  uid: user?.userInfo.uid,
                  username: user?.userInfo?.displayName,
                  photoURL: user?.userInfo.photoURL ? user.userInfo.photoURL : null
                })}
                className='cursor-pointer'
              >
                <UserCard
                  key={user?.userInfo.uid}
                  username={user?.userInfo?.displayName}
                  photoURL={user?.userInfo.photoURL}
                  lastMessage={user.lastMessage}
                  uid={user?.userInfo.uid}
                  styles={styles}
                />
              </i>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default ChatsSidebar