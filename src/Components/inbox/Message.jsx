import React, { useEffect, useRef } from "react"
import solo from '../../assets/solo.png'
import space from '../../assets/space.png'


const Message = ({ userDoc, msg,chatUser }) => {

  const ref = useRef()

  // useEffect(() => {
  // ref.current.scrollIntoView({ behavior: "smooth" })
  // }, [msg])

  return (
    <div
      className={
        msg.senderId === userDoc.userId
          ? 'message messageOwner'
          : 'message'
      }
    >

      <div ref={ref}
        className='messageInfo '>
        <img
          className='MessageUserImg   '
          src={
            msg.senderId === userDoc.userId
              ? userDoc?.photoURL ? userDoc.photoURL : solo
              : chatUser?.photoURL ? chatUser.photoURL : solo
          }
          alt='' />
        <span>just now</span>
      </div>

      <div className='messageContent'>
        <div
          className={
            msg.senderId === userDoc.userId
              ? 'messageContentTextOwner '
              : ''
          }
        >
          <p
            className={
              msg.senderId === userDoc.userId
                ? ' messageTextOwner'
                : 'messageText'
            }
          >
            {msg?.text}
          </p>
        </div>
        {msg.img &&
          <div
            // className="owner flex flex-row-reverse mr-3"
            className={
              msg.senderId === userDoc.userId
                ? 'messageContentTextOwner '
                : ''
            }
          >

            <img
              className='sendedImage '
              src={msg.img}
              alt=''
            />
          </div>
        }
      </div>
    </div>
  )
}

export default Message