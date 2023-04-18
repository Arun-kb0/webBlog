import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../features/redux/firebase/auth/authAction'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'



// import { AiFillHome } from 'react-icons/ai'
// import { BiMessageSquareAdd, BiLogOut, BiLogIn } from 'react-icons/bi'
// import { FaHashtag, FaUserCircle } from 'react-icons/fa'

import {AiFillHome,IoPersonRemove,IoPersonAdd,
    BiMessageSquareAdd, BiLogOut, BiLogIn,
    FaHashtag, FaUserCircle
} from '../imports/reactIcons'

function SideBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuth, currentUser } = useSelector((store) => store.user)


    const handleLogout = () => {
        dispatch(userLogout(currentUser.user.uid))
        navigate('/login')
    }
    return (
        <div className='side-bar-container'>
            <div className='side-bar'>
                <i >
                    <Link to="/">
                        <SideBarIcon icon={<AiFillHome size='28' />} text='Home' sideBarControl />
                    </Link>
                </i>
                <Divider />
                <i >
                    <Link to="/createpost">
                        <SideBarIcon icon={<BiMessageSquareAdd size='28' />} text='add post' />
                    </Link>
                </i>

                <i >
                    <Link to="/profile">
                        <SideBarIcon icon={<FaUserCircle size='28' />} text='profile' />
                    </Link>
                </i>
                <i>
                <Link to="/addfollowers">
                        <SideBarIcon icon={<IoPersonAdd size='28' />} text='follow people' />
                    </Link>
                </i>
                <Divider />


                {
                    isAuth ?
                        <i onClick={handleLogout} >
                            <SideBarIcon icon={<BiLogOut size='28' />} text='logout' />
                        </i>
                        :
                        <i >
                            <Link to='/login'>
                                <SideBarIcon icon={<BiLogIn size='28' />} text='login' />

                            </Link>
                        </i>
                }

            </div>
        </div>

    )
}

const SideBarIcon = ({ icon, text = 'tooltip' }) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)

const Divider = () => <hr className='sidebar-hr' />

export default SideBar