import React from 'react'
import Messages from './Messages'
import Input from './MessageInput'


function Chats() {
  return (
    <div className='chatsContainer '>
      <div className='chats   '>
       <Messages/>
       <Input/>
      </div>
    </div>
  )
}


export default Chats

