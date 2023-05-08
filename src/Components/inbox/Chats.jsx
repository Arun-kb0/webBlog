import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import MessagesNavbar from './MessagesNavbar'

function Chats() {
  return (
    <div className='chatsContainer '>
      <div className='chats   '>
        <MessagesNavbar />
        <Messages />
        <MessageInput />

      </div>
    </div>
  )
}


export default Chats

