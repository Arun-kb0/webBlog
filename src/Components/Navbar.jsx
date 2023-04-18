import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../features/redux/firebase/auth/authAction'
import { search } from '../features/redux/firebase/elasticSearch/SearchActions'

import UseDarkMode from '../hooks/UseDarkMode'

import {
  FaSearch, FaHashtag, BiLogIn, BiLogOut, HiMenuAlt1, IoClose, FaSun, FaMoon
} from '../imports/reactIcons'


function Navbar(props) {
  const { isAuth } = useSelector((store) => {
    return store.user
  })

  const [viewSideBar, setviewSideBar] = useState(true)
  const handleClick = () => {
    console.log('hamberger handle click')
    setviewSideBar(!viewSideBar)
    props.getViewSideBarBit(viewSideBar)

  }

  return (
    <section className='top-navigation '>
      <i onClick={handleClick} >
        {viewSideBar ? <HambergerMenu /> : <CloseHamMenu />}</i>
      <Title />
      <ThemeIcon />
      <HashtagIcon />
      <Search />
      {
        isAuth ? <LogoutIcon /> :
          <Link to='/login'><LoginIcon /> </Link>
      }

    </section>
  )
}



// * theme icon
const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = UseDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme)

  return (
    <span onClick={handleMode} >
      {darkTheme ? <FaSun size='24' className='top-navigation-icon' />
        : <FaMoon size='24' className='top-navigation-icon' />
      }
    </span>
  )
}


// * search
const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchString, setsearchString] = useState('')
  const handleSearch = (e) => {
    e.preventDefault()
    console.log("handleSearch")
    dispatch(search(searchString))
    navigate('/search')
  }

  return (
    <div className='search'>
      <input
        onChange={(e) => setsearchString(e.target.value)}
        className='search-input'
        type='text'
        placeholder='Search...'
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

// * logout
const LogoutIcon = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {following,followingSize} = useSelector(state=> state.followReducer)

  const signUserOut = () => {
    dispatch(userLogout())
    navigate("/login")
  }
  return (
    <BiLogOut size='24' className='top-navigation-icon ' onClick={signUserOut} />
  )
}

const LoginIcon = () => <BiLogIn size='24' className='top-navigation-icon ' />
const HashtagIcon = () => <FaHashtag size='24' className='top-navigation-icon' />
const Title = () => <h5 className='title-text'>Dev Bloger</h5>
const HambergerMenu = () => <HiMenuAlt1 className='top-navigation-icon ml-4' size='28' />
const CloseHamMenu = () => <IoClose className='top-navigation-icon ml-4' size='28' />

export default Navbar