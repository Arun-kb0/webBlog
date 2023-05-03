import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { followUser, unfollowUser, getUserFollowList } from "../../features/redux/firebase/follow/followActions"
import { IoPersonAdd, IoClose, RiUserFollowFill, RiUserUnfollowFill } from '../../imports/reactIcons'
import solo from '../../assets/solo.png'

const UserCard = (props) => {

    const { username, uid, photoURL, lastMessage ,followColId, currentUserId, currentUserName, styles } = props

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
                photoURL,
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
                        src={photoURL ? photoURL : solo} alt="" />
                </div>
            </div>

            <div className={styles.userCardElements}>
                <p className={styles.userCardUserName} >
                    {username}
                </p>
                {
                    lastMessage && 
                    <p className="mx-1 opacity-50">{lastMessage}</p>
                }
                <div className='flex mx-1'>

                    {isFollowed ?
                        <button
                            onClick={handleFollow}
                            className={`dark:btn light-btn flex mx-2 ${styles.btn && styles.btn}`}
                        >
                            unfollow
                            <i className='pl-1'>
                                <RiUserUnfollowFill size='20' />
                            </i>
                        </button>

                        :

                        <button
                            onClick={handleFollow}

                            className={`dark:btn light-btn flex mx-2 ${styles.btn && styles.btn}`}>
                            follow
                            <i className='pl-1'>
                                <RiUserFollowFill size='20' />
                            </i>
                        </button>

                    }

                    <button
                        className={`dark:btn light-btn flex  ${styles.btn && styles.btn}`}
                    >

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