import React, { useState } from 'react'
import { FcAddImage } from 'react-icons/fc'
import { IoMdAttach } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../features/redux/firebase/chat/chatActions'

import {RiSendPlaneFill} from 'react-icons/ri'

function MessageInput() {
  const [text, setText] = useState('')
  const [img, setimg] = useState('')
  const dispatch = useDispatch()
  const { chatId, chatUser } = useSelector(state => state.chatReducer)

  const handleSend = () => {
    dispatch(sendMessage({ text, img, chatId, chatUser }))
    setText('')
    setimg(null)
  }

  const handleKey = (e) => {
    // e.keyCode === 13 && handleSend()
    console.log(e.key)
    if (e.keyCode === 13)
      handleSend()
  }

  return (
    <div className='messageInputContainer'>
      <input className='messageInput  '
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
        type='text' placeholder='type something'
      />
      <div className='send'>
        <IoMdAttach className='icon' size='28' />
        <input
          onChange={e => setimg(e.target.files[0])}
          type="file" style={{ display: "none" }} id='file'
        />
        <label htmlFor='file'>
          <FcAddImage className='icon' size='28' />
        </label>
        <button className='btn flex '
          onClick={handleSend}
        > send <RiSendPlaneFill size='20' className='ml-1'/> </button>
      </div>
    </div>
  )
}

export default MessageInput