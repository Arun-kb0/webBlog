import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { followUser, unfollowUser, getUserFollowList } from "../../features/redux/firebase/follow/followActions"
import { IoPersonAdd, IoClose ,RiUserFollowFill , RiUserUnfollowFill} from '../../imports/reactIcons'
import solo from '../../assets/solo.png'

const UserCard = ({ username, uid, followColId, currentUserId,currentUserName, styles }) => {
    const dispatch = useDispatch()
    const { following, followingSize } = useSelector(state => state.followReducer)
    const [isFollowed, setIsFollowed] = useState(false)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        console.log("following check")
        setIsFollowed(Boolean(
            following?.find((user) => {
                console.log(user.uid, uid)
                return user.uid === uid
            })
        ))
        console.warn(isFollowed)
    }, [])

    const handleFollow = () => {
        setCheck(!check)
        if (!isFollowed) {
            dispatch(followUser({
                username,
                uid,
                followColId,
                currentUserId,
                currentUserName
            }))
            setIsFollowed(!isFollowed)
        } else {
            dispatch(unfollowUser({
                username,
                uid,
                followColId,
                currentUserId,
                currentUserName
            }))
            setIsFollowed(!isFollowed)
        }
    }

    return (
        <div className={styles.userCardContainer} >
            <div className={styles.userCard}>
                <div className={styles.userCardProfileContainer}>
                    <img className={styles.profilePic}
                        src={solo} alt="" />
                </div>
            </div>

            <div className={styles.userCardElements}>

                <p className={styles.userCardUserName} >
                    {username}
                </p>
                <div className='flex mx-1'>

                {  isFollowed ?
                  <button
                        onClick={handleFollow}
                        className='dark:btn light-btn flex mx-2'
                    >
                        unfollow
                        <i className='pl-1'>
                            <RiUserUnfollowFill size='20' />
                        </i>
                    </button>

                    :

                    <button
                        onClick={handleFollow}
                        className='dark:btn light-btn flex mx-2'
                    >
                        follow

                        <i className='pl-1'>
                            <RiUserFollowFill size='20' />
                        </i>
                    </button>
                    
                }

                    <button className='dark:btn light-btn flex '>
                        remove
                        <i className='pl-2'>
                            <IoClose size='20' />
                        </i>
                    </button>
                </div>

            </div>
        </div>
    )
}


export default UserCard