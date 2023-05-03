import React, { useEffect, useState } from "react"
import Message from './Message'
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../features/redux/firebase/chat/chatActions"

const Messages = () => {
  const dispatch = useDispatch()
  const { userDoc } = useSelector(state => state.user)
  const { chatUser, chatId, messages } = useSelector(state => state.chatReducer)

  const [unsubscribe, setUnsubscribe] = useState(null)

  useEffect(() => {
    dispatch(getMessages(chatId))

    // const unsub = dispatch(getMessages(chatId))
    // setUnsubscribe(unsub)
    // return () => {
    //   if(unsubscribe)
    //     unsubscribe()
    // }
  }, [chatId])

  return (
    <div className='messages py-5'>
      {
        messages?.map((msg) => (
          <Message
            key={msg?.id}
            userDoc={userDoc}
            msg={msg}
          />
        ))
      }

    </div>
  )
}

export default Messages