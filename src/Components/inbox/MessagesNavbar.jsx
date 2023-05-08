import React from 'react'
import { useSelector } from 'react-redux'

const MessagesNavbar = () => {
    const { chatUser } = useSelector(state => state.chatReducer)
    return (
        <div className='w-full bg-cyan-600'>
            <p className='px-3 text-lg font-semibold dark:text-gray-900 text-gray-300'>
                {chatUser?.username}
            </p>
        </div>
    )
}

export default MessagesNavbar