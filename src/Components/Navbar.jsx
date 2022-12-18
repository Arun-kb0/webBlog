import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'


function Navbar() {

  const {isAuth} = useSelector((store)=>{
    console.log(store)
    return store.login
  })

  return (
    <nav className='flex justify-center bg-sky-900 ' >
      <Link to="/" className='navlink'>Home</Link>
      <Link to="/createpost" className='navlink'>Create post</Link>
     {isAuth && <Link to="/login" className='navlink'>Login</Link>}
    </nav>
  )
}

export default Navbar