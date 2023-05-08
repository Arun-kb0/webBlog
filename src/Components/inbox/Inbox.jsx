import React, { useEffect } from 'react'
import ChatsSidebar from './ChatsSidebar'
import Chats from './Chats'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Inbox() {
    const navigate = useNavigate()
    const { isAuth } = useSelector(state => state.user)

    useEffect(()=>{
        !isAuth && navigate("/login")
    })

    return (
        <div className='inbox-container '>
            {isAuth &&
                <div className='inbox '>
                    <ChatsSidebar />
                    <Chats />
                </div>
            }

        </div>
    )
}


export default Inbox