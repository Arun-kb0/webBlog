import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatsSidebar from './ChatsSidebar'
import Chats from './Chats'

function Inbox() {
    const { userDoc } = useSelector((state) => state.user)
    return (
        <div className='inbox-container '>
            <div className='inbox '>

                <ChatsSidebar/>
                <Chats/>
               
            </div>

        </div>
    )
}


export default Inbox