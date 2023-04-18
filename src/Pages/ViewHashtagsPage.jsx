import React from 'react'
import Home from '../Components/home/Home'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {IoClose} from '../imports/reactIcons'

function ViewHashtags() {
  const { hashtagPosts, tagChange, searchTag } = useSelector(state => state.hashtagReducer)
  const styles = {
    home: '',
    PostsContainers: 'mt-28'
  }
  return (
    <div className='home'>
      <HastagCloseBtn
        searchTag={searchTag}
      />

      <Home
        postLists={hashtagPosts}
        tagPostChange={tagChange}
        styles={styles}
      />
    </div>
  )
}


const HastagCloseBtn = ({ searchTag }) => {
  const navigate = useNavigate()
  const  handleClick = ()=>{
    navigate("/")
  }
  return (
    <div className='tagPostClose '>
      <button className='tagPostClose-btn'>
        <span>#{searchTag}</span>
        <i onClick={handleClick}
          className='close-icon' >
          < IoClose size='18' />
        </i>
      </button>

    </div>
  )
}

export default ViewHashtags