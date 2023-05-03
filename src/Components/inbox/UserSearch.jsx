import { useDispatch } from "react-redux"
import {FaSearch} from '../../imports/reactIcons'
import React,{useState} from "react"
import {searchUser } from '../../features/redux/firebase/chat/chatActions'

const UserSearch = () => {
    const dispatch = useDispatch()
    const [searchString, setsearchString] = useState('')
  
    const handleKeyDown = (e) => {
      if (e.keyCode === 13)
        handleSearch()
    }
  
  
    const handleSearch = (e) => {
      // e.preventDefault()
      console.log("handleSearch")
    //   dispatch(search(searchString))
    dispatch(searchUser(searchString))
    }
  
    return (
      <div className={`search w-full my-4`}>
        <input
          onChange={(e) => setsearchString(e.target.value)}
          onKeyDown={handleKeyDown}
          className='search-input'
          type='text'
          placeholder='Search people...'
        />
        <i className='my-auto mx-1 cursor-pointer' >
          <FaSearch
            size='18'
            onClick={handleSearch}
          />
        </i>
      </div>
    )
  }


  export default UserSearch