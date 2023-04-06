import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../features/redux/firebase/auth/authAction'
import { search } from '../features/redux/firebase/elasticSearch/SearchActions'

import { FaSearch, FaHashtag, FaHamburger } from 'react-icons/fa'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { FaSun, FaMoon } from 'react-icons/fa'
import { HiMenuAlt1 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import UseDarkMode from '../hooks/UseDarkMode'

function Navbar(props) {
  const { isAuth } = useSelector((store) => {
    return store.user
  })

  const [viewSideBar, setviewSideBar] = useState(false)
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

const Search = () => {
  const dispatch = useDispatch()

  const handleSearch = (e)=>{
      console.log("handleSearch")
      dispatch(search(e.target.value))
  }

  return (
    <div className='search'>
      <input onChange={handleSearch}
      className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className=' my-auto' />
    </div>
  )
}

const LogoutIcon = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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